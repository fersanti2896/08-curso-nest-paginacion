import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PokedexService } from './pokedex.service';
import { CreatePokedexDto, UpdatePokedexDto } from './dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('pokedex')
export class PokedexController {
  constructor(
    private readonly pokedexService: PokedexService
  ) {}

  @Post()
  @HttpCode( HttpStatus.OK )
  create( @Body() createPokedexDto: CreatePokedexDto ) {
    return this.pokedexService.create( createPokedexDto );
  }

  @Get()
  findAll() {
    return this.pokedexService.findAll();
  }

  @Get(':term')
  findOne( @Param('term') term: string ) {
    return this.pokedexService.findOne( term );
  }

  @Patch(':term')
  update( @Param('term') term: string, @Body() updatePokedexDto: UpdatePokedexDto ) {
    return this.pokedexService.update( term, updatePokedexDto );
  }

  @Delete(':id')
  remove( @Param('id', ParseMongoIdPipe ) id: string ) {
    return this.pokedexService.remove( id );
  }
}
