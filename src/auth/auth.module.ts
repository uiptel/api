import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
