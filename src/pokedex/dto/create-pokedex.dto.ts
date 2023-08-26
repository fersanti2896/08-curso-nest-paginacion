import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokedexDto {
    @IsString()
    @MinLength(1)
    name: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    readonly no: number;
}
