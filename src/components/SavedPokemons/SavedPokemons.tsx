import React from "react";
import { PokemonInfo } from "../../types/PokemonTypes";

interface Props {
  savedPokemon: PokemonInfo[];
  trainerName: string;
  onReset: () => void;
}

export const SavedPokemons: React.FC<Props> = ({ savedPokemon, trainerName, onReset }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col justify-center shadow items-center p-5 border dark:border-black-700">
        <div className="flex justify-between">
          <h1 className="flex items-center justify-center mb-4 text-2xl">
            Pokémon Team: {trainerName}
          </h1>

          <button
            onClick={onReset}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          >
            Reset All Pokémon
          </button>
        </div>

        <div className="flex w-400">
          {savedPokemon.map((pokemon, index) => (
            <div
              key={index}
              className="flex-col justify-end mx-2 bg-white border w-60 border-gray-200 rounded-lg shadow dark:bg-gray-200 dark:border-gray-700"
            >
              <div>
                <img
                  src={pokemon.ability.sprites.other.dream_world.front_default}
                  className="rounded-t-lg mx-auto h-52 m-2"
                  alt="Pokemon image"
                />
              </div>

              <div className="p-5 justify-end items-end">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-500 dark:text-black uppercase">
                    {pokemon.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <div className="flex mt-2">
                    <p className="mr-4 text-gray-900">
                      Exp: <b>{pokemon.ability.base_experience}</b>
                    </p>
                    <p className="mr-4 text-gray-900">
                      Hp: <b>{pokemon.ability.stats[0].base_stat}</b>
                    </p>
                  </div>
                  <div>
                    <p className="mr-4 text-gray-900">
                      Attack: <b>{pokemon.ability.stats[1].base_stat}</b>
                    </p>
                    <p className="mr-4 text-gray-900">
                      Defense: <b>{pokemon.ability.stats[2].base_stat}</b>
                    </p>
                    <p className="mr-4 text-gray-900">
                      Speed: <b>{pokemon.ability.stats[3].base_stat}</b>
                    </p>
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
