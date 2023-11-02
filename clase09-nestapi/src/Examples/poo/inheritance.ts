import { Injectable } from '@nestjs/common';

// Clase base User
class User {
  constructor(
    public id: number,
    public email: string,
    private password: string, // El password es privado
  ) {}

  validatePassword(password: string): boolean {
    return this.password === password;
  }
}

// Clase derivada para AdminUser
class AdminUser extends User {
  constructor(
    id: number,
    email: string,
    password: string,
    public readonly privileges: string[], // Privilegios adicionales para el admin
  ) {
    super(id, email, password);
  }

  // Método específico de Admin para agregar privilegios
  addPrivilege(privilege: string): void {
    this.privileges.push(privilege);
  }
}

// Servicio base para usuarios
@Injectable()
class UserService {
  protected users: User[] = [];
  private nextId: number = 1;

  findAll(): User[] {
    return this.users;
  }

  createUser(email: string, password: string): User {
    const user = new User(this.nextId++, email, password);
    this.users.push(user);
    return user;
  }

  findById(userId: number): User | undefined {
    return this.users.find((user) => user.id === userId);
  }
}

// Servicio extendido específicamente para AdminUsers
@Injectable()
class AdminUserService extends UserService {
  createUser(email: string, password: string, privileges: string[]): AdminUser {
    const adminUser = new AdminUser(this.nextId++, email, password, privileges);
    this.users.push(adminUser);
    return adminUser;
  }

  // Método específico para encontrar AdminUsers
  findAdminUsers(): AdminUser[] {
    return this.users.filter(
      (user) => user instanceof AdminUser,
    ) as AdminUser[];
  }
}

// Uso de los servicios
const userService = new UserService();
const adminUserService = new AdminUserService();

// Crear un usuario regular
const user = userService.createUser('user@example.com', 'userpass');

// Crear un usuario admin
const adminUser = adminUserService.createUser(
  'admin@example.com',
  'adminpass',
  ['manage-users'],
);

// El adminUser tiene un método adicional para agregar privilegios
adminUser.addPrivilege('manage-server');

console.log(adminUserService.findAll()); // Listará tanto usuarios regulares como admins
console.log(adminUserService.findAdminUsers()); // Listará sólo los admins
