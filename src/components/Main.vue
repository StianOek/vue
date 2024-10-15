<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Characters } from "../types";

const characterList = ref<Characters>([]);

onMounted(async () => {
  try {
    const response = await fetch("/src/characters.json");
    if (response.ok) {
      const data = await response.json();
      characterList.value = data;
    } else {
      console.error("Failed to fetch characters:", response.statusText);
    }
  } catch (error) {
    // Håndtere feil om det går galt. For nå så skriver vi bare ut feilen i konsollen.
    console.error("Error fetching characters:", error);
  }
});
</script>

<template>
  <h1>Case</h1>
</template>
