import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokedex } from 'src/pokedex/entities/pokedex.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel( Pokedex.name )
    private readonly pokedexModel: Model<Pokedex>,
    private readonly http: AxiosAdapter
  ) {}

  async executeSeed() {
    await this.pokedexModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10271');

    const pokemonToInsert: { name: string, no: number }[] = [];

    for (const { name, url } of data.results) {
      const segments = url.split('/');
      const noPokemon: number = +segments[segments.length - 2];

      pokemonToInsert.push({ name, no: noPokemon });
    }

    await this.pokedexModel.insertMany( pokemonToInsert );

    return 'Pokemon Executed';
  }
}
