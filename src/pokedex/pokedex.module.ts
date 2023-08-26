import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { PokedexService } from './pokedex.service';
import { PokedexController } from './pokedex.controller';
import { Pokedex, PokedexSchema } from './entities/pokedex.entity';

@Module({
  controllers: [ PokedexController ],
  providers: [ PokedexService ],
  imports: [
    MongooseModule.forFeature( [
      {
        name: Pokedex.name,
        schema: PokedexSchema
      }
    ] )
  ]
})
export class PokedexModule {}
