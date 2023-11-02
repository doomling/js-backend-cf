// interfaces.ts
// Definición de la interfaz Readable para las operaciones de lectura.
export interface Readable<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
}

// Definición de la interfaz Writable para las operaciones de escritura.
export interface Writable<T> {
  create(item: T): Promise<void>;
  update(id: string, item: T): Promise<void>;
  delete(id: string): Promise<void>;
}

// user.service.ts
import { Injectable } from '@nestjs/common';
import { Readable, Writable } from './interfaces';

// Definición de la estructura de datos para un Usuario.
export interface User {
  id: string;
  name: string;
  // Otras propiedades del usuario
}

// Servicio que implementa las interfaces Readable y Writable para usuarios.
@Injectable()
export class UserService implements Readable<User>, Writable<User> {
  private users: User[] = []; // Almacenamiento en memoria para ejemplificar.

  // Método para obtener todos los usuarios.
  async findAll(): Promise<User[]> {
    return this.users;
  }

  // Método para obtener un usuario por su ID.
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  // Método para crear un nuevo usuario.
  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  // Método para actualizar un usuario existente.
  async update(id: string, user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    this.users[index] = user;
  }

  // Método para eliminar un usuario por su ID.
  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

// user.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService, User } from './user.service';

// Controlador que maneja las rutas de la API para los usuarios.
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Ruta para obtener todos los usuarios.
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Ruta para obtener un usuario específico por ID.
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  // Ruta para crear un nuevo usuario.
  @Post()
  async createUser(@Body() user: User): Promise<void> {
    return this.userService.create(user);
  }

  // Ruta para actualizar un usuario existente.
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: User): Promise<void> {
    return this.userService.update(id, user);
  }

  // Ruta para eliminar un usuario por ID.
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.delete(id);
  }
}

// app.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Módulo principal de la aplicación que registra el controlador y el servicio de usuarios.
@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
