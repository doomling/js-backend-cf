import { Injectable } from '@nestjs/common';

// Clase base User
class User {
  constructor(
    public id: number,
    public email: string,
    protected password: string, // Cambiado a protected para permitir el acceso en clases derivadas
  ) {}

  // Método para validar la contraseña
  validatePassword(password: string): boolean {
    return this.password === password;
  }
}

// Clase derivada para AdminUser
class AdminUser extends User {
  public readonly privileges: string[];

  constructor(
    id: number,
    email: string,
    password: string,
    privileges: string[],
  ) {
    super(id, email, password);
    this.privileges = privileges;
  }

  // Sobrescribiendo el método validatePassword
  validatePassword(password: string): boolean {
    const valid = super.validatePassword(password);
    console.log(
      `Administrador ${
        valid ? 'validó' : 'no validó'
      } correctamente la contraseña.`,
    );
    return valid;
  }

  // Método específico de Admin para agregar privilegios
  addPrivilege(privilege: string): void {
    this.privileges.push(privilege);
  }
}

// Ejemplo de uso:
const admin = new AdminUser(1, 'admin@example.com', 'securepassword', [
  'manage-system',
]);
const isValid = admin.validatePassword('securepassword'); // Esto también imprimirá un mensaje en la consola.
