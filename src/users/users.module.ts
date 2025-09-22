import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


//import is what i will be needing for myself i.e. userRepository to be used in userService
//export is what i am willing to share with others.
@Module({
  imports: [TypeOrmModule.forFeature([User])],  //NestJS will create a UserRepository that you can inject in your services.
  controllers: [UsersController],
  providers: [UsersService],
  //If OrdersModule or any other module wants to use UserRepository, it can’t.
  //you need to do this:
  exports: [TypeOrmModule] // now any module can import UserModule and then use userService in their service.
})
export class UsersModule {}
