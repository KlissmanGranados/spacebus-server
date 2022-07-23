import { RoleDto } from "@shared/dto/select-by-id.dto";
import { Exclude, instanceToPlain, Transform, TransformFnParams, Type } from "class-transformer";
import { IsEmail, IsString, MaxLength, ValidateNested } from "class-validator";
import * as crypto from "crypto";
import { CreatePersonDto } from "./create-person.dto";

export class CreateUserDto {

    @IsString()
    @MaxLength(45)
    @Transform(({ value }: TransformFnParams) => value.trim())
    username: string;

    @Exclude({ toPlainOnly: true })
    @IsString()
    @Transform(({ value }: TransformFnParams) =>
        crypto.createHash('sha256').update(value).digest('base64'))
    password: string;

    @IsEmail()
    @MaxLength(100)
    email: string;

    @ValidateNested({ each: true })
    @Type(() => RoleDto)
    role: RoleDto;

    @ValidateNested({ each: true })
    @Type(() => CreatePersonDto)
    person: CreatePersonDto;

    toJSON() {
        return instanceToPlain(this);
    }
}