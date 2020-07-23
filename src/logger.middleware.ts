import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

export const logger = new Logger('http', false);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const { ip, method, originalUrl: url  } = req;
    const hostname = require('os').hostname();
    const userAgent = req.get('user-agent') || '-';
    const referer = req.get('referer') || '-';

    res.on('close', () => {
      const { statusCode, statusMessage } = res;
      const contentLength = res.get('content-length') || '0';
      logger.log(`[${hostname}] "${method} ${url}" ${statusCode} ${statusMessage} ${contentLength} "${referer}" "${userAgent}" "${ip}"`);
    });

    next();
  }
}
