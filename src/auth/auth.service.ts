import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Role } from '../common/enum';
import { IAddUser } from '../user/interface/add-user.interface';
import { UserService } from '../user/user.service';
import { TokenOutput } from './dto/token.output';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  signJsonWebToken(userId: number, role: Role) {
    const accessToken = this.jwtService.sign({ _id: userId, _role: role }, { expiresIn: '7d' });
    const refreshToken = this.jwtService.sign({ _id: userId, _role: role, _refresh: true }, { expiresIn: '180d' });

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string): Promise<TokenOutput> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('존재하지 않는 회원입니다.');
    }
    const isValidPassword = await bcrypt.compare(password, user.password.replace(/^\$2y\$/, '$2a$'));
    if (!isValidPassword) {
      throw new BadRequestException({ error: '비밀번호를 확인해주세요.' });
    }

    return this.signJsonWebToken(user.id, Role.ADMIN);
  }

  async signup(input: IAddUser) {
    const existsUser = await this.userService.getUserByEmail(input.email);
    if (existsUser) {
      throw new BadRequestException('이미 회원으로 등록되어 있는 이메일 입니다.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(input.password, salt);
    const user = await this.userService.addUser({ ...input, password: hashedPassword });
    return this.signJsonWebToken(user.id, Role.ADMIN);
  }
}
