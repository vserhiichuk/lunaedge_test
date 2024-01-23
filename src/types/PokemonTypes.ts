export interface PokemonApi {
  name: string;
  url: string;
}

export interface PokemonSelect {
  value: string;
  label: string;
}

export interface PokemonInfo {
  name: string;
  ability: {
    base_experience: number;
    stats: Characteristics[];
    sprites: {
      front_default: string;
      back_default: string;
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  };
}

interface Characteristics {
  base_stat: number;
}
