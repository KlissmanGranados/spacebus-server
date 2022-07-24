import { RoleDto } from "@shared/dto/select-by-id.dto";
import { IsDefined, IsEmail, IsNotEmpty, IsNotEmptyObject, IsNumber, IsString } from "class-validator";

export class UserDto {
    @IsNumber()
    id: number;
    @IsString()
    username: string;
    @IsEmail()
    email: string;
    @IsDefined()
    @IsNotEmpty()
    @IsNotEmptyObject()
    role: RoleDto;
    iat?: Date;
}