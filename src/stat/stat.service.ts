import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stat } from './stat.entity';
import { CreateStatDto } from './createStatDto';

@Injectable()
export class StatService {
  constructor(
    @InjectRepository(Stat) private readonly repository: Repository<Stat>,
  ) {}

  findAll(): Promise<Stat[]> {
    return this.repository.find();
  }

  find(id: number): Promise<Stat> {
    return this.repository.findOneOrFail(id);
  }

  save(createStatDto: CreateStatDto): Promise<Stat> {
    return this.repository.save(createStatDto);
  } 
}