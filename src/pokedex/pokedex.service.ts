import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreatePokedexDto, UpdatePokedexDto } from './dto';
import { Pokedex } from './entities/pokedex.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokedexService {
  constructor(
    @InjectModel( Pokedex.name )
    private readonly pokedexModel: Model<Pokedex>
  ) {}

  async create( createPokedexDto: CreatePokedexDto ) {
    createPokedexDto.name = createPokedexDto.name.toLocaleLowerCase();

    try {
      const pokedex = await this.pokedexModel.create( createPokedexDto );
  
      return pokedex;
    } catch (error) {
      const msgError = 'El pokemon ya existe en la BD:';
      const msgErrorGen = 'No se pudo crear el pokemon';

      this.handleExceptions(error, msgError, msgErrorGen);
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [ total, pokemons ] = await Promise.all([ 
      this.pokedexModel.countDocuments(),
      this.pokedexModel.find()
                       .limit( limit )
                       .skip( offset )
                       .sort({ no: 1 })
                       .select('-__v')
    ]);

    const totalPaginas = Math.ceil((total * 1) / limit);

    const paginado = {
      antes: offset - 1,
      actual: offset,
      despues: offset + 1,
      total,
      totalPaginas,
    };
    
    return { paginado, pokemons };
  }

  async findOne( term: string ) {
    let pokemon: Pokedex;

    /* Verificación por Número: no */
    if( !isNaN(+term) ) {
      pokemon = await this.pokedexModel.findOne({ no: term });
    }

    /* Verificacion por MongoID: _id */
    if( !pokemon && isValidObjectId( term ) ) {
      pokemon = await this.pokedexModel.findById( term );
    }

    /* Verificación por Nombre: name */
    if( !pokemon ) {
      pokemon = await this.pokedexModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    if( !pokemon ) throw new NotFoundException(`Pokemon con Id, Name o No: ${ term } no encontrado.`)
    
    return pokemon;
  }

  async update( term: string, updatePokedexDto: UpdatePokedexDto ) {
    const pokemon = await this.findOne( term );

    if( updatePokedexDto.name ) {
      updatePokedexDto.name = updatePokedexDto.name.toLocaleLowerCase();
    }

    try {
      await pokemon.updateOne( updatePokedexDto, { new: true } );
  
      return { ...pokemon.toJSON(), ...updatePokedexDto };
    } catch (error) {
      const msgError = 'Ya existe la propiedad de un pokemon en la BD:';
      const msgErrorGen = 'No se pudo actualizar el pokemon';

      this.handleExceptions(error, msgError, msgErrorGen);
    }
  }

  async remove( id: string ) {
    // const pokemon = await this.findOne( id );

    // await pokemon.deleteOne();
    const { deletedCount } = await this.pokedexModel.deleteOne({ _id: id });

    if( deletedCount === 0 ) {
      throw new BadRequestException(`No se encontró el pokemon con el id ${ id }.`);
    }

    return;
  }

  /* Metodo para manejar errores */
  private handleExceptions( error: any, msgError: string, msgErrorGen: string ) {
    if( error.code === 11000 ) {
      throw new BadRequestException(`${ msgError } ${ JSON.stringify( error.keyValue ) }`);
    }

    throw new InternalServerErrorException(`${ msgErrorGen } - Verique Logs del Server`);
  }
}
