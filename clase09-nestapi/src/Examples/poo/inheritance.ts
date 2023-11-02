import { Injectable, Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

// Servicio base para obtener información de Pokémon de la PokeAPI.
@Injectable()
class PokemonService {
  constructor(private httpService: HttpService) {}

  // Método para obtener un Pokémon por nombre.
  async getPokemonByName(name: string): Promise<any> {
    // Realiza la petición HTTP y devuelve la respuesta.
    const response = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`),
    );
    return response.data;
  }
}

// Servicio especializado para Pokémon de tipo agua que extiende de PokemonService.
@Injectable()
class WaterPokemonService extends PokemonService {
  // Sobreescribe el método getPokemonByName para filtrar solo los Pokémon de tipo agua.
  async getPokemonByName(name: string): Promise<any> {
    const pokemon = await super.getPokemonByName(name);
    // Verifica si el Pokémon es de tipo agua, si no, lanza un error.
    if (!pokemon.types.some((typeInfo) => typeInfo.type.name === 'water')) {
      throw new Error('This is not a water-type Pokémon.');
    }
    return pokemon;
  }
}

// Controlador con las rutas de la API.
@Controller()
class PokemonController {
  constructor(
    private pokemonService: PokemonService,
    private waterPokemonService: WaterPokemonService,
  ) {}

  // Ruta para obtener cualquier Pokémon.
  @Get('pokemon/:name')
  async getPokemon(name: string) {
    return this.pokemonService.getPokemonByName(name);
  }

  // Ruta para obtener solo Pokémon de tipo agua.
  @Get('water-pokemon/:name')
  async getWaterPokemon(name: string) {
    return this.waterPokemonService.getPokemonByName(name);
  }
}

// Módulo

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, WaterPokemonService, HttpService],
})
class AppModule {}
