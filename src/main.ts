import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger('main', false);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.getHttpAdapter().getInstance().enable('trust proxy');
  await app.listen(3000);
  return app;
}

bootstrap().then(app => {
  const process = require('process');
  const shutdown = (message: string) => app.close().then(_ => logger.log(message));

  process.on('SIGINT', () => shutdown('Exit on SIGINT...'));
  process.on('SIGTERM', () => shutdown('Exit on SIGTERM...'));

  logger.log('Application started.');
});
