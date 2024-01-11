import React, { useEffect, useState } from "react";
import { PokemonSelect } from "../../pages/Main";
import axios from 'axios';

interface Props {
  trainerName: string;
  selectedOption: PokemonSelect[];
  onClose: () => void;
}

interface PokemonInfo {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

export const Modal: React.FC<Props> = ({ onClose, trainerName, selectedOption }) => {
  const [pokemonData, setPokemonData] = useState<PokemonInfo[]>([]);

  console.log(pokemonData);

  const handleCloseModal = () => {
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          selectedOption.map(async ({ value }) => {
            console.log(value);

            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${value}`
            );

            return {
              name: value,
              sprites: response.data.sprites,
            };
          })
        );

        console.log(data);

        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    if (selectedOption.length > 0) {
      fetchData();
    }
  }, [selectedOption]);

  return (
    <div className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center items-center w- md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="shadow relative bg-white rounded-lg shadow white:bg-gray-700 border dark:border-black-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300">
            <h3 className="text-xl font-semibold text-gray-600 dark:text-black-600">
              YOUR TEAM
            </h3>
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Your Pokémon trainer name is: {trainerName}
            </p>

            <div className="flex flex-col space-y-4">
              {pokemonData.map((value, index) => (
                <div key={index} className="flex">
                  <img
                    src={value.sprites.front_default}
                    alt={`Pokemon sprite ${index}`}
                    className="w-32 h-32 object-cover"
                  />

                  <img
                    src={value.sprites.back_default}
                    alt={`Pokemon sprite ${index}`}
                    className="w-32 h-32 object-cover"
                  />

                  <h1 className="flex justify-center items-center mx-auto text-white uppercase">
                    {value.name}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
