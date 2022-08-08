import { PageAndSortingDto, PaginatorDto } from "@shared/dto/paginator.dto";
import { EntityManager, EntityTarget, QueryRunner, Repository } from "typeorm";

export class BaseRepository<T> extends Repository<T> {
    constructor(
        readonly target: EntityTarget<T>,
        readonly manager: EntityManager,
        readonly queryRunner?: QueryRunner) {
        super(target, manager, queryRunner);
    }

    getEntityManager(): EntityManager {
        return this.manager;
    }

    async findAll(
        { order, page, pageSize, where }: PageAndSortingDto<T>): Promise<PaginatorDto<T>> {
        const paginator = new PaginatorDto<T>();
        paginator.totalElements = await this.count({ where });

        paginator.page = page;
        paginator.pagesize = pageSize;

        paginator.totalPage = Math.ceil(paginator.totalElements / pageSize);

        paginator.content = await this.find({
            take: pageSize,
            skip: (page - 1) * pageSize,
            where,
            order
        });

        return paginator;
    }
}