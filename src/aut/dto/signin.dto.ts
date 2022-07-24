import { Exclude, instanceToPlain, Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import * as crypto from "crypto";

export class SigninDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @Exclude({ toPlainOnly: true })
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) =>
        crypto.createHash('sha256').update(value).digest('base64'))
    password: string;

    toJSON() {
        return instanceToPlain(this);
    }
}