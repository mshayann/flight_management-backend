import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/users/DTOs/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(loginDTO : LoginDTO) {
    const user = await this.usersRepository.findOne({ where: { email: loginDTO.email } });  //email is the column in db and loginDTO.email is what user has entered.

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    } else {
      const isValid = await bcrypt.compare(loginDTO.password, user.password);
      if (isValid) {
        const { password, ...result } = user;   //apart from password, return everything else in the user.
        const payload = {sub: user.user_id, username: user.name, role: user.role}
        console.log(payload);
        
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
      } 
      else {
        throw new UnauthorizedException('Incorrect password');
      }

    }
  }
}
