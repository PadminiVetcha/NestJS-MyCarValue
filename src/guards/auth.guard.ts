import { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * Guard is a decorator that is used to guard a route and forbids the access to route if some
 * doesn't meet the condition.
 *  */

export class AuthGuard implements CanActivate {
  /**
   * canActivate is a method that returns true if user can access route.
   */
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
