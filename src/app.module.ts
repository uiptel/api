import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatController } from './stat/stat.controller';
import { Stat } from './stat/stat.entity';
import { StatService } from './stat/stat.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [Stat],
    }),
    TypeOrmModule.forFeature([Stat])
  ],
  controllers: [StatController],
  providers: [StatService],
})
export class AppModule {}
