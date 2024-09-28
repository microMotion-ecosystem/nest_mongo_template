import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as process from "node:process";

@Injectable()
export class AddXClientServiceNameInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    request.headers['X-Client-Service'] = `${process.env.APP_NAME}/${process.env.APP_VERSION} (${process.env.APP_ENV}; ${process.env.port})`;
    request.headers['X-Clients-Ancestors'] = (request.headers['X-Clients-Ancestors'] || '') + `, ${process.env.APP_NAME}`;

    return next.handle();
  }
}
