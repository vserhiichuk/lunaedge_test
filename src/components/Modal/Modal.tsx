import React, { useEffect, useState } from "react";
import axios from "axios";
import { PokemonInfo, PokemonSelect } from "../../types/PokemonTypes";

interface Props {
  trainerName: string;
  selectedOption: PokemonSelect[];
  setShowForm: (value: boolean) => void;
  onSave: (pokemonData: PokemonInfo[]) => void;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({
  onClose,
  onSave,
  setShowForm,
  trainerName,
  selectedOption,
}) => {
  const [pokemonData, setPokemonData] = useState<PokemonInfo[]>([]);

  const handleCloseModal = () => {
    onClose();
  };

  const handleSave = () => {
    onSave(pokemonData);
    setShowForm(true);
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
              ability: response.data,
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
        <div className="relative bg-white rounded-lg shadow white:bg-gray-700 border dark:border-black-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300">
            <h3 className="text-xl font-semibold text-gray-600 dark:text-black-600">
              YOUR TEAM
            </h3>
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-600">
              Your Pokémon trainer name is: <b>{trainerName}</b>
            </p>

            <div className="flex-col space-y-4">
              {pokemonData.map((value, index) => (
                <div key={index} className="flex border dark:border-black-700">
                  <img
                    src={value.ability.sprites.front_default}
                    alt={`Pokemon sprite ${index}`}
                    className="w-28 h-28 object-cover border dark:border-black-700 m-1"
                  />

                  <img
                    src={value.ability.sprites.back_default}
                    alt={`Pokemon sprite ${index}`}
                    className="w-28 h-28 object-cover border dark:border-black-700 m-1"
                  />

                  <div className="flex-col justify-start items-start ml-10 w-full">
                    <h1 className="text-black mt-1">
                      Name:{" "}
                      <b className="uppercase text-gray-600">{value.name}</b>
                    </h1>

                    <div className="flex mt-2">
                      <div className="mr-16">
                        <p>
                          Exp: <b>{value.ability.base_experience}</b>
                        </p>
                        <p>
                          Hp: <b>{value.ability.stats[0].base_stat}</b>
                        </p>
                      </div>
                      <div>
                        <p>
                          Attack: <b>{value.ability.stats[1].base_stat}</b>
                        </p>
                        <p>
                          Defense: <b>{value.ability.stats[2].base_stat}</b>
                        </p>
                        <p>
                          Speed: <b>{value.ability.stats[3].base_stat}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-32"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
