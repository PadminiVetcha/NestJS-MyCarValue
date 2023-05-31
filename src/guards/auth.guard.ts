import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // return true if user can access the route, else false
    const request = context.switchToHttp().getRequest();
    return request.session.userId;
  }
}
