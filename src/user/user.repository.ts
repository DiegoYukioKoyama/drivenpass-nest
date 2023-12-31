import { Injectable, Scope } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";
import { SignUpDto } from 'src/auth/dto/singup.dto';

@Injectable()
export class UsersRepository {

  private SALT = 10;
  constructor(private readonly prisma: PrismaService) { }

  create(signUpDto: SignUpDto) {
    return this.prisma.user.create({
      data: {
        ...signUpDto,
        password: bcrypt.hashSync(signUpDto.password, this.SALT)
      }
    })
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email }
    })
  }

  getById(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }
}
