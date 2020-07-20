import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

export const logger = new Logger('http', false);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const { ip, method, originalUrl: url  } = req;
    const { statusCode } = res;
    const hostname = require('os').hostname();
    logger.log(`${hostname}: "${method} ${url}" ${statusCode} ${ip}`);
    next();
  }
}
