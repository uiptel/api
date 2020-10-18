import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from './logger/logger.sevice';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

    constructor(private readonly logger: AppLogger) {
        logger.setContext(this);
    }

    use(req: Request, res: Response, next: () => void): void {
        const { ip, method, originalUrl: url  } = req;
        const hostname = require('os').hostname();
        const userAgent = req.get('user-agent') || '-';
        const referer = req.get('referer') || '-';

        res.on('close', () => {
            const { statusCode, statusMessage } = res;
            const contentLength = res.get('content-length') || '0';
            this.logger.log(`[${hostname}] "${method} ${url}" ${statusCode} ${statusMessage} ${contentLength} "${referer}" "${userAgent}" "${ip}"`);
        });

        next();
    }
}
