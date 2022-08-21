import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

// header로 담겨온 uid 검증후 반환하여 API에 파라미터로 넘기는 커스텀 데코레이터
export const UserUid = createParamDecorator(
  (data, context: ExecutionContext) => {
    if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const request = gqlContext.getArgByIndex(2).req;
      return validateRequest(request);
    }

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      return validateRequest(request);
    }
  },
);

const validateRequest = (request: any) => {
  if (request.headers && request.headers.uid) {
    return request.headers.uid;
  } else {
    throw new BadRequestException(
      `You should include property name 'uid' in headers`,
    );
  }
};
