import { CountryDto, IdentificationTypeDto, PlanetDto } from "@shared/dto/select-by-id.dto";
import { Transform, TransformFnParams, Type } from "class-transformer";
import { IsString, MaxLength, ValidateNested } from "class-validator";

export class CreatePersonDto {

    @IsString()
    @MaxLength(45)
    @Transform(({ value }: TransformFnParams) => value.trim())
    name: string;

    @IsString()
    @MaxLength(45)
    @Transform(({ value }: TransformFnParams) => value.trim())
    lastName: string;

    @ValidateNested({ each: true })
    @Type(() => IdentificationTypeDto)
    identificacionType: IdentificationTypeDto;

    @IsString()
    @MaxLength(45)
    @Transform(({ value }: TransformFnParams) => value.trim())
    identificacion: string;

    @ValidateNested({ each: true })
    @Type(() => CountryDto)
    country: CountryDto;

    @ValidateNested({ each: true })
    @Type(() => PlanetDto)
    favoritePlanet: PlanetDto;

}