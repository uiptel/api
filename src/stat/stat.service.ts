import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stat } from './stat.entity';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

@Injectable()
export class StatService extends TypeOrmCrudService<Stat>{
  constructor(@InjectRepository(Stat) private readonly repository: Repository<Stat>) {
    super(repository);
  }
}