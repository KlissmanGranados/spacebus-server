import { IsNumber, Min } from "class-validator";

export class SelectById {
    @IsNumber()
    @Min(1)
    id: number;
    name: string;
}

export class RoleDto extends SelectById { }

export class CountryDto extends SelectById { }

export class IdentificationTypeDto extends SelectById { }

export class PlanetDto extends SelectById {
    image: string;
    icon: string;
    code: string;
}