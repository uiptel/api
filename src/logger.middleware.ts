import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

export const logger = new Logger('http', false);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const { ip, protocol, hostname, method, originalUrl: url  } = req;
    logger.log(`${ip}: ${method} ${protocol}://${hostname} ${url}`);
    next();
  }
}
