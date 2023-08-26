import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokedex } from 'src/pokedex/entities/pokedex.entity';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel( Pokedex.name )
    private readonly pokedexModel: Model<Pokedex>
  ) {}

  async executeSeed() {
    await this.pokedexModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10271');

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
