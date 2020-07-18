import {
  Controller, Get, Post, Body, Ip, Headers, Res, Param, ParseIntPipe,
  NotFoundException, BadRequestException, Query, DefaultValuePipe
} from '@nestjs/common';
import { StatService } from './stat.service';
import { Stat } from './stat.entity';
import { StatDto } from './statDto';
import { Response } from 'express';
import { Pagination } from './pagination';

@Controller('stat')
export class StatController {
  constructor(private readonly statService: StatService) { }

  @Get()
  async index(
    @Query('limit', new DefaultValuePipe(30), new ParseIntPipe()) limit: number,
    @Query('page', new DefaultValuePipe(1), new ParseIntPipe()) page: number
  ): Promise<Pagination> {
    return this.statService.index({ take: limit, order: { createdAt: 'ASC' }}, page);
  }

  @Get(':id')
  async find(@Param('id', new ParseIntPipe()) id: number): Promise<Stat> {
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
