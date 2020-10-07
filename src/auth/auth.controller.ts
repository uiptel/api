import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { User } from 'src/users/users.service';
import { LocalAuthGuard, JwtAuthGuard, TokenModel } from './auth.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')    
    async login(@Request() req): Promise<TokenModel> {
        return this.authService.login(req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('')
    me(@Request() req): User {
      return req.user;
    }
}
