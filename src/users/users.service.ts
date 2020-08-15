import { Injectable } from '@nestjs/common';

export interface User {
    id: number;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            { id: 1, username: 'admin', password: 'pass4admin' },
            { id: 2, username: 'ryzhov@uiptel.com', password: '22alex22' },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
