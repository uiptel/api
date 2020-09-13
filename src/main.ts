import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('main', false);
const shutdown = (app: INestApplication, message: string) => app.close().then(_ => logger.log(message));

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const process = require('process');
    const port = app.get(ConfigService).get('port');

    app.getHttpAdapter().getInstance().enable('trust proxy');
    await app.listen(port);

    process.on('SIGINT', () => shutdown(app, 'Exit on SIGINT...'));
    process.on('SIGTERM', () => shutdown(app, 'Exit on SIGTERM...'));

    logger.log(`Application started on port: ${port}.`);

    return app;
}

bootstrap();
