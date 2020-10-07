import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';

export interface TokenModel {
    access_token: string;
}

export interface JwtPayload {
    username: string,
    sub: number,
}

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await this.usersService.findOne(username);
        return user && user.password === password ? user : undefined;
    }

    async login(user: User): Promise<TokenModel> {
        const payload: JwtPayload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
