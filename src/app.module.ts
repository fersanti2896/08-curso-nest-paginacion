import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { PokedexModule } from './pokedex/pokedex.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [ 
    ServeStaticModule.forRoot({
      rootPath: join( __dirname, '..', 'public' ),
    }), 
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokedexModule,
    CommonModule,
    SeedModule
  ]
})
export class AppModule {}
