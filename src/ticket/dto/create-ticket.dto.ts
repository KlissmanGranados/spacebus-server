import { SpaceCraftCompanyDto } from "@shared/dto/select-by-id.dto";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsNumber, IsString, MaxLength, Min, ValidateNested } from "class-validator";
import { CreateRocketLauncheDto } from "./create-rocket-launche.dto";

export class CreateTicketDto {
    @IsString()
    @MaxLength(45)
    @Transform(({ value }) => value.trim().replaceAll(/\s{2,}/g, " "))
    description: string;

    @IsNumber()
    @Min(1000)
    @Type(() => Number)
    price: number;

    @Type(() => SpaceCraftCompanyDto)
    spacecraftCompany: SpaceCraftCompanyDto;

    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => CreateRocketLauncheDto)
    rocketLaunche: CreateRocketLauncheDto;
}