import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, EntityManager } from 'typeorm';
import { Stat } from './stat.entity';
import { CreateStatDto } from './createStatDto';
import { Pagination } from './pagination';

@Injectable()
export class StatService {
  private readonly maxLimit = 30;

  constructor(
    @InjectRepository(Stat) private readonly repository: Repository<Stat>,
  ) {}

  index(options: FindManyOptions = {}, page: number): Promise<Pagination> {
    if (options.take > this.maxLimit) {
      options.take = this.maxLimit;
    }

    options.skip = (page - 1) * options.take;
    const { manager } = this.repository;
    return manager.transaction<Pagination>(async (em: EntityManager): Promise<Pagination> => {
      const index = await em.find(Stat, options);
      const total = await em.count(Stat);
      return { index, total, limit: options.take, page };
    });
  }

  find(id: number): Promise<Stat> {
    return this.repository.findOneOrFail(id);
  }

  save(createStatDto: CreateStatDto): Promise<Stat> {
    return this.repository.save(createStatDto);
  } 
}