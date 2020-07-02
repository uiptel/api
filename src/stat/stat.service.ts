import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stat } from './stat.entity';
import { CreateStatDto } from './createStatDto';

@Injectable()
export class StatService {
  constructor(
    @InjectRepository(Stat) private repository: Repository<Stat>,
  ) {}

  findAll(): Promise<Stat[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Stat> {
    return this.repository.findOne(id);
  }

  save(createStatDto: CreateStatDto): Promise<Stat> {
    return this.repository.save(createStatDto);
  } 
}