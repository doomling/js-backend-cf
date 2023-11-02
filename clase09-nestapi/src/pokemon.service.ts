import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PokemonService {
  constructor(private readonly httpService: HttpService) {}

  async getPokemonByName(name: string) {
    return this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }
}
