import { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * Allow to approve or unapprove the report only if the user is admin.
 */
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }
    return request.currentUser.admin; // check if current user is admin
  }
}
