import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { firstValueFrom } from 'rxjs';
import { Param, Res } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class PokemonController {
  pokemon: any[];

  constructor(private readonly pokemonService: PokemonService) {
    this.pokemon = [];
  }

  @Get('/pokemon/:name')
  async getPokemon(@Param('name') pokemon, @Res() response): Promise<any> {
    try {
      const { data } = await firstValueFrom(
        await this.pokemonService.getPokemonByName(pokemon),
      );
      response.send(data.name);
    } catch (e) {
      throw new HttpException(
        'Error al obtener el Pokémon',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
