import { Controller, Get, Post, Body, Ip, Headers } from '@nestjs/common';
import { StatService } from './stat.service';
import { Stat } from './stat.entity';
import { CreateStatDto } from './createStatDto';
import { StatDto } from './statDto';

@Controller('stat')
export class StatController {
  constructor(private readonly stat: StatService) { }

  @Get()
  async index(): Promise<Stat[]> {
    return this.stat.findAll();
  }

  @Post()
  async create(
    @Body() statDto: StatDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string = '',
    @Headers('referer') referer: string = ''
  ): Promise<any> {
      const stat: CreateStatDto = { ...statDto, ip, userAgent, referer};
      return this.stat.save(stat).then((stat: Stat) => stat.id);
  }
}
