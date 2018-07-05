import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user';
export declare class UserController {
    protected userRepo: UserRepository;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<Array<User>>;
    getUserById(id: number): Promise<User>;
}
