import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialDto);
  }
  async signIn(
    authCredentailsDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentailsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
  // async forgetPassword(user: User): Promise<{ accessToken: string }> {
  //   const { email } = user;
  //   const user = await this.usersRepository.findOne({ email });
  // }
  // async updatePassword(password: string): Promise<User> {
  //   const user = await this.usersRepository.save(user);
  //   return user;
  // }
}