import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';

export class AuthRepository extends Repository<User> {}
