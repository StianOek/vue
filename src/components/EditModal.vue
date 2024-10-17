<script setup lang="ts">
import { ref } from "vue";
import { Character } from "../types";

// Her kommer vi til å bruke defineProps og defineEmits for å håndtere props og events
const props = defineProps<{
  characterToUpdate: Character;
  races: string[];
}>();

// Emit events for å lukke modalen og oppdatere karakteren
const emit = defineEmits(["closeModal", "updateCharacter"]);

const localCharacter = ref<Character>({ ...props.characterToUpdate });

const closeModal = () => {
  emit("closeModal");
};

const handleUpdateCharacter = () => {
  emit("updateCharacter", localCharacter.value);
};

console.log();
</script>

<template v-if="props.isModalOpen">
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-md max-w-lg w-full">
      <h2 class="text-2xl font-bold mb-4">Update Character</h2>

      <form @submit.prevent="handleUpdateCharacter">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            v-model="props.characterToUpdate.name"
            id="name"
            type="text"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div class="mb-4">
          <label for="race" class="block text-sm font-medium text-gray-700">Race</label>
          <select v-model="props.characterToUpdate.race" id="race" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
            <option v-for="race in races" :key="race" :value="race">{{ race }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="level" class="block text-sm font-medium text-gray-700">Level</label>
          <input
            v-model.number="props.characterToUpdate.level"
            id="level"
            type="number"
            min="1"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div class="flex justify-end gap-4">
          <button type="button" @click="closeModal" class="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded">Cancel</button>
          <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>
