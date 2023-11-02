// Esto normalmente estaría en un archivo llamado create-user.dto.ts
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

// Esto normalmente estaría en un archivo llamado update-user.dto.ts
export class UpdateUserDto {
  readonly name?: string;
  readonly email?: string;
  readonly password?: string;
}

// Esto normalmente estaría en un archivo llamado user.entity.ts
export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  // Otras propiedades y métodos de la entidad User
}

// Esto normalmente estaría en un archivo llamado user.repository.ts
// Definimos una clase abstracta con los métodos esperados
export abstract class UserRepository {
  abstract findAllUsers(): Promise<User[]>;
  abstract findUserById(id: string): Promise<User | null>;
  abstract createUser(user: CreateUserDto): Promise<User>;
  abstract updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
}

// Esto normalmente estaría en un archivo llamado sql.user.repository.ts
// Tenemos una definición concreta para manejar específicamente los usuarios que vengan desde SQL
// podemos tener otra para Mongo y fácilmente desacoplar nuestras decisiones de datos del código
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlUserRepository extends UserRepository {
  private users: User[] = []; // Simula una base de datos con un array en memoria

  // implementaciones concretas

  async findAllUsers(): Promise<User[]> {
    return this.users;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = {
      ...createUserDto,
      id: Date.now().toString(), // Generación simple de ID para fines de ejemplo
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.findUserById(id);
    if (!user) throw new Error('Usuario no encontrado');
    user = { ...user, ...updateUserDto };
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}

// Esto normalmente estaría en un archivo llamado app.module.ts o user.module.ts
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: SqlUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserModule {}
