import { Controller, Get, Post, Body } from '@nestjs/common';
import { StatService } from './stat.service';
import { Stat } from './stat.entity';
import { CreateStatDto } from './createStatDto';

@Controller('stat')
export class StatController {
  constructor(
    private readonly statService: StatService
  ) {}

  @Get()
  async index(): Promise<Stat[]> {
    return this.statService.findAll();
  }

  @Post()
  async create(@Body() createStatDto: CreateStatDto): Promise<number> {
    return this.statService.save(createStatDto).then((stat: Stat) => stat.id);
  }
}
