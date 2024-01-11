import axios from "axios";
import { PokemonApi } from "../types/PokemonTypes";

export const fetchPokemonData = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

    return response.data.results.map((el: PokemonApi) => ({
      value: el.name,
      label: el.name,
    }));
  } catch (error) {
    console.error("Error fetching data from PokeAPI:", error);
    throw error;
  }
};
