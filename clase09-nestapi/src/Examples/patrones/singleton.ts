import { Injectable, Scope, Controller, Get } from '@nestjs/common';

// Este es un servicio singleton, el cual es el ámbito por defecto en NestJS.
// Nest creará una única instancia de este servicio y la compartirá en toda la aplicación.
@Injectable()
export class SingletonService {
  private count = 0;

  increment() {
    this.count++;
  }

  getCount() {
    return this.count;
  }
}

// Este es un servicio con ámbito transitorio.
// Nest creará una nueva instancia del servicio cada vez que se inyecte.
@Injectable({ scope: Scope.TRANSIENT })
export class TransientService {
  private count = 0;

  increment() {
    this.count++;
  }

  getCount() {
    return this.count;
  }
}

// Un controlador para demostrar el uso de ambos servicios.
@Controller('counter')
export class AppController {
  constructor(
    private readonly singletonService: SingletonService,
    private readonly transientService: TransientService,
  ) {}

  @Get('/singleton')
  getSingletonCount(): string {
    this.singletonService.increment();
    return `Singleton count is now: ${this.singletonService.getCount()}`;
  }

  @Get('/transient')
  getTransientCount(): string {
    this.transientService.increment();
    return `Transient count is now: ${this.transientService.getCount()}`;
  }
}
