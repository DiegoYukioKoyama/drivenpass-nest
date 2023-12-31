import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const data = this.authService.checkToken(authorization ?? "".split(" "[1]));
      const user = await this.userService.getUserById(parseInt(data.sub));
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}