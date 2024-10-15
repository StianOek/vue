// src/composables/useCharacters.ts
import { ref } from "vue";
import { Characters, Character } from "../types";

const characterList = ref<Characters>([]);

// Jeg bruker isFetched for å sjekke om vi allerede har hentet karakterene, dette er for å unngå refetch når jeg navigerer med router frem og tilbake.
const isFetched = ref<boolean>(false);

const fetchCharacters = async () => {
  if (isFetched.value) return; // sjekk om vi allerede har hentet karakterene, hvis vi har det, ikke gjør noen ting
  try {
    const response = await fetch("/src/characters.json");
    if (response.ok) {
      const data = await response.json();
      characterList.value = data;
      isFetched.value = true;
    } else {
      console.error("Failed to fetch characters:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching characters:", error);
  }
};

const addCharacter = (newCharacter: Character) => {
  characterList.value.push(newCharacter);
};

export function useCharacters() {
  return {
    characterList,
    fetchCharacters,
    addCharacter,
  };
}
