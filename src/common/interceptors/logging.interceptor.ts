import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Request>();
      const { method, url } = request;
      const ctx = `${context.getClass().name} ➜ ${context.getHandler().name}()`;
      const now = Date.now();

      return next.handle().pipe(
        tap(response => {
          const ms = `+${Date.now() - now}ms`;
          this.logger.log(`${method} ${url} \u001B[33m${ms}\u001B[0m`, ctx);
          this.logger.debug(response, ctx);

          return response;
        }),
      );
    }

    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      // Get user that sent request
      const parentType = info.parentType.name;
      // const fieldName = info.fieldName;
      const query = info.fieldNodes[0]?.loc?.source?.body;
      // const query = context.getArgByIndex(2).req.body.query;
      const message = `GraphQL - ${parentType}`;

      const ctx = `${context.getClass().name} ➜ ${context.getHandler().name}`;
      const now = Date.now();

      return next.handle().pipe(
        tap(response => {
          const ms = `+${Date.now() - now}ms`;
          this.logger.log(`${message} \u001B[33m${ms}\u001B[0m`, ctx);
          this.logger.debug('Request Body ➜ \n' + query, ctx);
          this.logger.debug('Response ➜', ctx);
          if (process.env.NODE_ENV !== 'production') {
            console.dir(response);
          }
          return response;
        }),
      );
    }
  }
}
