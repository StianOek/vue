<script setup lang="ts">
import homePageImage from "../assets/transparent.webp";
</script>

<template>
  <section class="p-4 rounded flex flex-col items-center gap-4">
    <h1 class="text-9xl font-bold text-white items-center">Character creator</h1>
    <p class="text-white bg-[#4d5156] rounded-full p-4">Make your own massive multiplayer online characters</p>
  </section>

  <!-- Centering the image in the middle of the screen -->
  <section class="flex justify-center items-center h-1/2">
    <img :src="homePageImage" alt="Home page image" class="object-contain h-full" />
  </section>
</template>
