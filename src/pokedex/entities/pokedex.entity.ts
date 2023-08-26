import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose'
import { Document } from 'mongoose';

@Schema()
export class Pokedex extends Document {
    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    no: number;
}

export const PokedexSchema = SchemaFactory.createForClass( Pokedex );
