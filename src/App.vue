<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main class="max-w-6xl w-full m-auto" :style="{ height: `calc(100vh - 100px)` }">
    <RouterView />
  </main>
</template>
