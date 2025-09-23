import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/users/DTOs/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK) //By default, POST returns 201 Created. this changes it to 200. (dont know why, documentation did)
    @Post('login')

    async login(@Body() loginDTO : LoginDTO){

        return this.authService.login(loginDTO);
    }

    @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

    
}
