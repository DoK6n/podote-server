import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class UidGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const request = gqlContext.getArgByIndex(2).req;
      return this.validateRequest(request);
    }

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      return this.validateRequest(request);
    }
  }

  private validateRequest(request: any) {
    const { headers } = request;
    if (headers.uid) {
      const regexUid = /^[A-Za-z0-9_-]{28}$/i;
      const regexTodoId =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      const isValidUid = regexUid.test(headers.uid);

      if (isValidUid) return true;
      else throw new NotFoundException('uid validation fail - wrong pattern');
    } else {
      throw new NotFoundException('not found uid');
    }
  }
}
