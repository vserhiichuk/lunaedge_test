import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MultiValue } from "react-select";
import { Modal } from "../components/Modal/Modal";
import axios from "axios";
import Select from "react-select";

interface FormValues {
  trainer: string;
  category: string;
}

interface PokemonApi {
    name: string;
    url: string;
  }

  export interface PokemonSelect {
    value: string;
    label: string;
  }

export function MainPage() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [trainerName, setTrainerName] = useState("");
  const [selectedOption, setSelectedOption] = useState<PokemonSelect[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");

      console.log(data);
      setData(
        data.results.map((el: PokemonApi) => {
          return {
            value: el.name,
            label: el.name,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching data from PokeAPI:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormValues> = async (formData: FormValues) => {
    try {
      await handleSubmit(() => {})(formData);

      setTrainerName(formData.trainer);
      setModalOpen(true);
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  const handleChangeOption = (newValue: MultiValue<PokemonSelect>) => {

    console.log(newValue);
    if (newValue.length <= 4) {
      setSelectedOption([...newValue]);
    } else {
      console.log("error");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="">
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
                {errors.trainer.message}
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
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      {modalOpen && (
        <Modal
          onClose={closeModal}
          trainerName={trainerName}
          selectedOption={selectedOption}
        />
      )}
    </div>
  );
}
