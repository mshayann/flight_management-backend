import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './user.entity';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './DTOs/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
//without DTO
//   async signup(name: string, email: string, password: string) {
//     const existingUser = await this.usersRepository.findOne({
//       where: { email },
//     });
//     if (existingUser) {
//       throw new BadRequestException('User already exists with this email');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10

//     const newUser = this.usersRepository.create({
//       name,
//       email,
//       password: hashedPassword,
//       role: UserRole.PASSENGER, // default role
//     });

//     const savedUser = await this.usersRepository.save(newUser);

//     return {
//       message: 'Signup is successful',
//       user: savedUser,
//     };
//   }


// with DTO
  async signup(signupDTO : SignupDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: signupDTO.email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(signupDTO.password, 10); // saltRounds = 10

    const newUser = this.usersRepository.create({
      name : signupDTO.name,
      email : signupDTO.email,
      password: hashedPassword,
      role: UserRole.PASSENGER, // default role
    });

    const savedUser = await this.usersRepository.save(newUser);

    return {
      message: 'Signup is successful',
      user: savedUser,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return {
          message: 'User has logged in successfully',
          user: user,
        };
      } else {
        throw new UnauthorizedException('Incorrect password');
      }
    }
  }
}
