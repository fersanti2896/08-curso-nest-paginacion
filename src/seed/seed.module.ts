import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokedexModule } from 'src/pokedex/pokedex.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ SeedController ],
  providers: [ SeedService ],
  imports: [ 
    CommonModule,
    PokedexModule
  ]
})
export class SeedModule {}
