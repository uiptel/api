import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { UsersService, User } from '../users/users.service';
import { AppLogger } from 'src/logger/logger.sevice';

class AuthException extends Error {
    constructor(message: string) {
        super(message);
    }
}

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
        private readonly jwtService: JwtService,
        private readonly logger: AppLogger
    ) {
        logger.setContext(this);
    }

    async validateUser(username: string, pass: string): Promise<User> {
        const user = await this.usersService.findOne(username);
        if (!user) {
            throw new AuthException(`username "${username}" not found`);
        }
        if (user.password !== pass) {
            throw new AuthException('invalid credentials');
        }
        const { password, ...result } = user;
        return result;
    }

    async login(user: User): Promise<TokenModel> {
        const payload: JwtPayload = { username: user.username, sub: user.id };
        this.logger.log(`user "${user.username}" with id => ${user.id} logged in`);

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
