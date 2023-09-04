import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/singup.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UsersRepository) { }

  async create(signUpDto: SignUpDto) {
    const { email } = signUpDto;
    const user = await this.userRepository.getUserByEmail(email);

    if(user) throw new ConflictException("Email already in use.");

    return await this.userRepository.create(signUpDto);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email)
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getById(id);

    if(!user) throw new NotFoundException("User not found.");

    return user;
  }
}
