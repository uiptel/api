import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.service';
import { AppLogger } from 'src/logger/logger.sevice';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly logger: AppLogger
    ) {
        super();
        logger.setContext(this);
    }

    async validate(username: string, password: string): Promise<User> {
        try {
            return await this.authService.validateUser(username, password);
        } catch (ex) {
            this.logger.warn(ex.message);
            throw new UnauthorizedException();
        }
    }
}
