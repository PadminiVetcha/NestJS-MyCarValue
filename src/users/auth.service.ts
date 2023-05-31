import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto'; // randomBytes generated salt and scrypt is hashing function
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //// See if email already exists
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email already exists..!');
    }
    ////Hash the user password
    //Generate a salt
    const salt = randomBytes(8).toString('hex');

    //Hash salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //join hashed result and salt together
    const result = salt + '.' + hash.toString('hex');

    //create a new user and save it
    const user = await this.usersService.create(email, result);

    //return the user
    return user;
  }

  async signin(email: string, password: string) {
    //check whether user exists
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User Not Found!');
    }
    //if user exists, get the password and split them into salt and hash
    const [salt, storedHash] = user.password.split('.');

    //join password and salt and send to hashing function
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //compare resulted hash with stored hash from db
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid Password..!');
    }
    return user;
  }
}
