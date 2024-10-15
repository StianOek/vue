// src/composables/useCharacters.ts
import { ref } from "vue";
import { Characters, Character } from "../types";
import axios from "axios";

const characterList = ref<Characters>([]);

// Jeg bruker isFetched for å sjekke om vi allerede har hentet karakterene, dette er for å unngå refetch når jeg navigerer med router frem og tilbake.
const fetchCharacters = async () => {
  try {
    const response = await fetch("http://localhost:3001/characters");
    if (response.ok) {
      const data = await response.json();
      characterList.value = data;
    } else {
      console.error("Failed to fetch characters:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const addCharacter = async (newCharacter: Character) => {
  const add = await axios.post("http://localhost:3001/characters", newCharacter);
  if (add.status === 201) {
    characterList.value.push(newCharacter);
  } else {
    console.error("Failed to add character:", add.statusText);
  }
};

export function useCharacters() {
  return {
    characterList,
    fetchCharacters,
    addCharacter,
  };
}
