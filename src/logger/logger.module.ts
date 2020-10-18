import { Module } from '@nestjs/common';
import { AppLogger } from './logger.sevice';

@Module({
    providers: [AppLogger],
    exports: [AppLogger],
})
export class LoggerModule {}
