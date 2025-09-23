import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './DTOs/signup.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    // signup request
    //without DTO.
    // @Post('signup')

    // async signup(@Body('name') name : string, @Body('email') email : string, @Body('password') password : string){      // jo bhi body me aye usko userData me daldo
        
    //     return this.usersService.signup(name, email, password);
    // }

    // with DTO.
    @Post('signup')
     async signup(@Body() signupDTO : SignupDto){      // DTO class se nikaal lo aur ye rules bhi check krlegi inputs ke
        
        return this.usersService.signup(signupDTO);
    }

    // @Post('login')

    // async login(@Body('email') email : string, @Body('password') password: string){

    //     return this.usersService.login(email, password);
    // }
}
