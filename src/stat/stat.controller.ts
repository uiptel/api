import {
  Controller, Get, Post, Body, Ip, Headers, Res, Param, ParseIntPipe,
  NotFoundException, BadRequestException, Query, DefaultValuePipe
} from '@nestjs/common';
import { StatService } from './stat.service';
import { Stat } from './stat.entity';
import { StatDto } from './statDto';
import { Response } from 'express';

@Controller('stat')
export class StatController {
  private readonly maxLimit = 30;
  constructor(private readonly statService: StatService) { }

  @Get()
  async index(
    @Query('limit', new DefaultValuePipe(10), new ParseIntPipe()) limit: number,
    @Query('offset', new DefaultValuePipe(0), new ParseIntPipe()) offset: number
  ): Promise<Stat[]> {
    return this.statService.findAll({
      take: limit < this.maxLimit ? limit : this.maxLimit,
      skip: offset,
      order: { id: 'ASC' },
    });
  }

  @Get(':id')
  async fetch(@Param('id', new ParseIntPipe()) id: number): Promise<Stat> {
    return this.statService.find(id)
      .catch(error => { throw new NotFoundException(error); });
  }

  @Post()
  async create(
    @Res() response: Response,
    @Body() statDto: StatDto,
    @Ip() ip: string,
    @Headers('user-agent') userAgent: string = '',
    @Headers('referer') referer: string = ''
  ): Promise<Response> {
    return this.statService.save({ ...statDto, ip, userAgent, referer})
      .then(stat => response.set('Location', `/stat/${stat.id}`).send(stat))
      .catch(({message}) => { throw new BadRequestException(message); })
    ;
  }
}
