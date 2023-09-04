import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/singup.dto';
import { SignInDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private EXPIRATION_TIME = "1 days";
  private ISSUER = "Driven";
  private AUDIENCE = "users";

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService) { }

  async signUp(signUpDto: SignUpDto) {
    const createUser = await this.userService.create(signUpDto);
    return "User created successfully!";
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.getUserByEmail(signInDto.email);

    if(!user) throw new UnauthorizedException("Email or password not valid.");
    
    const valid = await bcrypt.compare(signInDto.password, user.password);

    if(!valid) throw new UnauthorizedException("Email or password not valid.");

    return this.createToken(user);
  }

  createToken(user: User) {
    const { id, email } = user;
    const token = this.jwtService.sign({ email }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    })
    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: this.AUDIENCE,
      issuer: this.ISSUER
    })
    return data;
  }
}
