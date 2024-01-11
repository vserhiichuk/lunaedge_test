import React, { useState, useEffect } from "react";
import { Modal } from "../components/Modal/Modal";
import { fetchPokemonData } from "../api/PokemonApi";
import { PokemonSelect } from "../types/PokemonTypes";
import { PokemonForm } from "../components/PokemonForm/PokemonForm";

interface FormData {
  trainer: string;
  category: string;
}

export function MainPage() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [trainerName, setTrainerName] = useState("");
  const [selectedOption, setSelectedOption] = useState<PokemonSelect[]>([]);

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

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="">
      <PokemonForm
        onSubmit={onSubmit}
        selectedOption={selectedOption}
        setSelectedOption={(newValue) => setSelectedOption(newValue)}
        data={data}
      />

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
