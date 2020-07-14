import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatController } from './stat/stat.controller';
import { Stat } from './stat/stat.entity';
import { StatService } from './stat/stat.service';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ entities: [Stat] }),
    TypeOrmModule.forFeature([Stat]),
  ],
  controllers: [StatController],
  providers: [StatService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
    ;
  }
}
