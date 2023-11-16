import { Injectable } from '@nestjs/common';
import { User } from '../types/User';

@Injectable()
export class AuthService {
  testUser: User;

  constructor() {
    this.testUser = {
      id: 10,
      name: 'juani',
      password: 'test',
    };
  }

  //ACA TRAEMOS AL USUARIO DE MONGO
  validateUser(username: string, password: string): any {
    console.log('AuthService validateUser()');
    if (
      this.testUser.name.toLowerCase() == username.toLowerCase() &&
      this.testUser.password == password
    ) {
      return {
        userId: this.testUser.id,
        name: this.testUser.name,
      };
    }
  }
}
