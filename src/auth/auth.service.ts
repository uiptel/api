import { Injectable } from '@nestjs/common';
import { UsersService, User } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<User | undefined> {
        const user = await this.usersService.findOne(username);
        return user && user.password === password ? user : undefined;
    }
}
