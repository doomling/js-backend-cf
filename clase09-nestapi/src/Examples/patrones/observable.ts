import {
  Controller,
  Get,
  Param,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Response } from 'express';

@Controller()
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('/pokemon/:name')
  getPokemon(@Param('name') name: string, @Res() response: Response) {
    this.pokemonService.getPokemonByName(name).subscribe({
      next: (data) => {
        response.send(data);
      },
      error: () => {
        throw new HttpException(
          'Error al obtener el Pokémon',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      },
    });
  }
}
