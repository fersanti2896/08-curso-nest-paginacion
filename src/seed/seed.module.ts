import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokedexModule } from 'src/pokedex/pokedex.module';

@Module({
  controllers: [ SeedController ],
  providers: [ SeedService ],
  imports: [ PokedexModule ]
})
export class SeedModule {}
