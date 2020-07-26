import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class StatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { ip } = request;
    const { 'user-agent': userAgent = '', referer = '' } = request.headers;

    request.body = { ...request.body, ip, userAgent, referer };
    return next.handle();
  }
}