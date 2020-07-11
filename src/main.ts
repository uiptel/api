import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

const logger = new Logger('uiptel', false);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
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
