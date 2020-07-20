
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Stat } from './stat.entity';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Stat])],
    providers: [StatService],
    controllers: [StatController],
})
export class StatModule {}
