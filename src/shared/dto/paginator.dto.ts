import { Transform } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { FindOptionsOrder, FindOptionsWhere } from "typeorm";

export class PaginatorDto<T> {
    totalPage: number;
    totalElements: number;
    page: number;
    pagesize: number;
    content: T[];
}

export class DefaultPageDto {

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Max(20)
    @Min(10)
    pageSize: number = 10;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    page: number = 1;

}

export class PageAndSortingDto<T> {

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Max(20)
    @Min(10)
    pageSize: number = 10;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(1)
    page: number = 1;

    @IsDefined()
    @IsNotEmpty()
    where: FindOptionsWhere<T> = {};

    @IsDefined()
    @IsNotEmpty()
    order: FindOptionsOrder<T> = {};
}