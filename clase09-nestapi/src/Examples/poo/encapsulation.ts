// Este código normalmente se dividiría en varios archivos:

// user.entity.ts
export class User {
  private password: string; // Encapsulado, no accesible fuera de esta clase
  constructor(
    public readonly id: string,
    public readonly email: string,
    password: string,
  ) {
    this.password = password;
  }

  validatePassword(password: string): boolean {
    return this.password === password;
  }

  // ... Otros métodos y propiedades
}

// user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
class UserService {
  private users: User[] = []; // Datos encapsulados, no directamente accesibles

  createUser(email: string, password: string): User {
    const newUser = new User(Date.now().toString(), email, password);
    this.users.push(newUser);
    return newUser;
  }

  // ... Otros métodos
}

// user.module.ts
import { Module } from '@nestjs/common';

@Module({
  providers: [UserService],
  exports: [UserService], // UserService está disponible para otros módulos
})
class UserModule {}

// En un ejemplo de uso, tendrías algo como esto:

// user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
//import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() body: { email: string; password: string }) {
    return this.userService.createUser(body.email, body.password);
  }

  // ... Otros endpoints
}

// app.module.ts
//import { Module } from '@nestjs/common';
//import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
