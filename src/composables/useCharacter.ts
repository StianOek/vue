// src/composables/useCharacters.ts
import { ref } from "vue";
import { Characters, Character } from "../types";
import axios from "axios";

const characterList = ref<Characters>([]);
const character = ref<Character | null>(null);

const isLoadingCharacter = ref(false);

// Jeg bruker isFetched for å sjekke om vi allerede har hentet karakterene, dette er for å unngå refetch når jeg navigerer med router frem og tilbake.
const fetchCharacters = async () => {
  try {
    const response = await axios.get("/api/characters");
    if (response.status === 200) {
      const data = await response.data;

      characterList.value = data;

      characterList.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      console.error("Failed to fetch characters:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const fetchCharacter = async (character_id: string) => {
  console.log(character_id);
  try {
    const response = await axios.get(`/api/characters/${character_id}`);
    if (response.status === 200) {
      const data = await response.data;
      console.log(data);
      // Sorter fra den nyeste til den eldste

      character.value = data;
      isLoadingCharacter.value = true;
    } else {
      console.error("Failed to fetch characters:", response.statusText);
    }
  } catch (error) {
  } finally {
    isLoadingCharacter.value = false;
  }
};

const addCharacter = async (newCharacter: Character) => {
  await axios.post("/api/characters", newCharacter);
};

const deleteCharacter = async (character_id: string) => {
  await axios.delete(`/api/characters/${character_id}`);
};

const updateCharacter = async (character_id: string, updatedCharacter: Character) => {
  await axios.put(`/api/characters/${character_id}`, updatedCharacter);
};

export function useCharacters() {
  return {
    characterList,
    character,
    isLoadingCharacter,
    fetchCharacters,
    fetchCharacter,
    addCharacter,
    deleteCharacter,
    updateCharacter,
  };
}
