import { Module, Injectable, Global } from '@nestjs/common';

// Este servicio podría ser responsable de cargar y validar las opciones de configuración.
@Injectable()
class ConfigOptionsService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    // Aquí podrías cargar las configuraciones de un archivo .env o cualquier otra fuente
    // y realizar validaciones necesarias.
    this.envConfig = {
      NODE_ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || '3000',
      // Aquí agregarías más configuraciones según sea necesario
    };
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

// El módulo que utiliza el servicio de ConfigOptionsService para proporcionar las configuraciones.
@Global()
@Module({
  providers: [
    {
      provide: 'CONFIG_OPTIONS',
      useFactory: (configService: ConfigOptionsService) => {
        // La factory podría devolver un objeto de configuración más complejo o personalizado.
        return {
          nodeEnv: configService.get('NODE_ENV'),
          port: parseInt(configService.get('PORT'), 10),
        };
      },
      inject: [ConfigOptionsService],
    },
    ConfigOptionsService, // Este también necesita ser un proveedor
  ],
  exports: ['CONFIG_OPTIONS', ConfigOptionsService], // Exportamos CONFIG_OPTIONS para que pueda ser inyectado en otros módulos.
})
export class ConfigModule {}

// En otros lugares de tu aplicación, podrías inyectar 'CONFIG_OPTIONS' para obtener acceso a estas configuraciones.
