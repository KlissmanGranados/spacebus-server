import { PlanetDto, SpaceCraftCompanyDto } from "@shared/dto/select-by-id.dto";
import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmptyObject, IsNumber, Min, MinDate, ValidateNested } from "class-validator";

export class CreateRocketLauncheDto {

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => SpaceCraftCompanyDto)
    spacecraftCompany: SpaceCraftCompanyDto;

    @IsNumber()
    @Min(10)
    @Type(() => Number)
    capacity: number;

    @IsDate()
    @MinDate(new Date())
    @Type(() => Date)
    launchDate: Date;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => PlanetDto)
    planetFrom: PlanetDto;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => PlanetDto)
    planetTo: PlanetDto;

    sold: number;
    available: number;
}