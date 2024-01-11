import React, { useState, useEffect } from "react";
import { Modal } from "../components/Modal/Modal";
import { fetchPokemonData } from "../api/PokemonApi";
import { PokemonInfo, PokemonSelect } from "../types/PokemonTypes";
import { PokemonForm } from "../components/PokemonForm/PokemonForm";
import { SavedPokemons } from "../components/SavedPokemons/SavedPokemons";

interface FormData {
  trainer: string;
  category: string;
}

export function MainPage() {
  const [data, setData] = useState([]);
  const [trainerName, setTrainerName] = useState("");
  const [selectedOption, setSelectedOption] = useState<PokemonSelect[]>([]);
  const [savedPokemon, setSavedPokemon] = useState<PokemonInfo[]>([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  console.log(savedPokemon);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await fetchPokemonData();
        setData(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = (formData: FormData) => {
    try {
      setTrainerName(formData.trainer);
      setModalOpen(true);
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  const handleSavePokemon = (pokemonData: PokemonInfo[]) => {
    setSavedPokemon([...savedPokemon, ...pokemonData]);
    setModalOpen(false);
  };

  const handleReset = () => {
    setShowForm(false);
    setSavedPokemon([]);
    setSelectedOption([]);
    setTrainerName("");
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="">
      {!showForm && (
        <PokemonForm
          onSubmit={onSubmit}
          selectedOption={selectedOption}
          setSelectedOption={(newValue) => setSelectedOption(newValue)}
          data={data}
        />
      )}

      {!modalOpen && showForm && (
        <SavedPokemons
          savedPokemon={savedPokemon}
          onReset={handleReset}
          trainerName={trainerName}
        />
      )}

      {modalOpen && (
        <Modal
          onClose={closeModal}
          trainerName={trainerName}
          selectedOption={selectedOption}
          onSave={handleSavePokemon}
          setShowForm={setShowForm}
        />
      )}
    </div>
  );
}
