<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main class="max-w-6xl w-full m-auto mt-40" :style="{ height: `calc(100vh - 160px)` }">
    <RouterView />
  </main>
</template>
