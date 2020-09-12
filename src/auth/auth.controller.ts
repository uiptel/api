import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard, JwtAuthGuard } from './auth.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')    
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('me')
    me(@Request() req) {
      return req.user;
    }
}
