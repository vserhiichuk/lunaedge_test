import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select, { MultiValue } from "react-select";
import { PokemonSelect } from "../../types/PokemonTypes";
import { FormData } from "../../types/FormData";

interface Props {
  onSubmit: SubmitHandler<FormData>;
  selectedOption: PokemonSelect[];
  setSelectedOption: (newValue: PokemonSelect[]) => void;
  data: PokemonSelect[];
}

export const PokemonForm: React.FC<Props> = ({
  data,
  onSubmit,
  selectedOption,
  setSelectedOption,
}) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const handleChangeOption = (newValue: MultiValue<PokemonSelect>) => {
    console.log(newValue);
    if (newValue.length <= 4) {
      setSelectedOption([...newValue]);
    } else {
      console.log("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center h-screen"
    >
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-96 mx-96 h-auto">
        <h1 className="mb-4">Team Pokémon</h1>

        <div className="mb-4">
          <label className="inline-block text-sm text-gray-600">
            Coach's Full Name
          </label>

          <input
            {...register("trainer", {
              required: "Trainer name is required.",
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "Please enter only English letters.",
              },
              minLength: {
                value: 2,
                message: "Trainer name must be at least 2 characters.",
              },
              maxLength: {
                value: 12,
                message: "Trainer name must be at most 12 characters.",
              },
            })}
            className={`shadow appearance-none border rounded w-full my-2 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.trainer ? "border-red-500" : ""
            }`}
            placeholder="Pokémon trainer"
            onChange={(e) => setValue("trainer", e.target.value)}
          />

          {errors.trainer && (
            <p className="text-red-500 text-xs italic">
              {errors.trainer.message as string}
            </p>
          )}
        </div>

        <div className="w-full">
          <label
            className="inline-block text-sm text-gray-600"
            htmlFor="Multiselect"
          >
            Select a team of Pokemon
          </label>
          <div className="relative flex flex-col w-full mb-8">
            <Select
              {...register("category", {
                validate: () => {
                  if (selectedOption.length < 4) {
                    return "Select at least 4 Pokémon for your team.";
                  }
                  return true;
                },
              })}
              className={`shadow appearance-none border rounded w-full text-gray-700 leading-tight my-2 focus:outline-none focus:shadow-outline ${
                errors.category ? "border-red-500" : ""
              }`}
              placeholder="Select a Pokemon..."
              options={data}
              value={selectedOption}
              isMulti={true}
              onChange={handleChangeOption}
            />

            {errors.category && (
              <p className="text-red-500 text-xs italic">
                {errors.category.message as string}
              </p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
