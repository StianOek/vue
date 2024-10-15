<script setup lang="ts">
import { ref } from "vue";

import { Character } from "../types";
import { useCharacters } from "../composables/useCharacter";

const { addCharacter } = useCharacters();

const newCharacter = ref<Character>({
  id: "",
  name: "",
  race: "",
  level: 1,
  createdAt: new Date().toISOString(),
  className: "",
});

const handleSubmit = () => {
  // Sjekker om navn og rase er satt før vi legger til karakteren som en slags validering.
  if (newCharacter.value.name && newCharacter.value.race) {
    newCharacter.value.id = Math.random().toString(36).substr(2, 9);
    addCharacter({ ...newCharacter.value });

    newCharacter.value.name = "";
    newCharacter.value.race = "";
    newCharacter.value.level = 1;
  }
};
</script>

<template>
  <h1 class="text-4xl font-bold text-slate-700 my-4">Create Character</h1>

  <form @submit.prevent="handleSubmit" class="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
      <input
        v-model="newCharacter.name"
        type="text"
        id="name"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div class="mb-4">
      <label for="race" class="block text-gray-700 text-sm font-bold mb-2">Race:</label>
      <input
        v-model="newCharacter.race"
        type="text"
        id="race"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>

    <div class="mb-4">
      <label for="level" class="block text-gray-700 text-sm font-bold mb-2">Level:</label>
      <input
        v-model="newCharacter.level"
        type="number"
        id="level"
        min="1"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Add Character
    </button>
  </form>
</template>
