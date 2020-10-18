import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from './logger/logger.sevice';

const shutdown = (app: INestApplication) => app.close();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const configService = app.get(ConfigService);
    const port = configService.get('port');
    const env = configService.get('nodeEnv');
    const version = configService.get('version');

    const logger = await app.resolve(AppLogger); 
    app.useLogger(logger);
    
    app.getHttpAdapter().getInstance().enable('trust proxy');
    await app.listen(port);

    process.on('SIGINT', () => shutdown(app).then(_ => logger.log('Exit on SIGINT...')));
    process.on('SIGTERM', () => shutdown(app).then(_ => logger.log('Exit on SIGTERM...')));

    logger.log(`started on port => ${port}, env => ${env}, version => ${version}`);

    return app;
}

bootstrap();
