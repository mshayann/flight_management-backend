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

// “Inject” = NestJS automatically provides ready-to-use objects (like DataSource, EntityManager, UserRepository) 
// into your class, so you don’t have to create them manually.


// DataSource = the main DB connection (master key).
// Use it if you want low-level control (raw queries, transactions, dynamic repository access).
// If you only need one entity, you can skip it and just inject a repository instead.


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,  //respository is object that gives you methods to run queries on that table.
  ) {}
  // constructor(private dataSource: DataSource) {} // if you do this, you can do this.dataSource.getRepository(User).find().
  // if you have a lot of entities, then only use it otherwise just inject the repository of that entity.
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
