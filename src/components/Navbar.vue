<script setup lang="ts">
import { ref } from "vue";
import { Links } from "../types";
import { RouterLink } from "vue-router";

const links = ref<Links>([
  { name: "Characters", path: "/" },
  { name: "New Character", path: "/new-characters" },
]);
</script>

<template>
  <main class="bg-gray-200 border border-b-gray-300 p-4">
    <nav class="max-w-6xl w-full m-auto flex justify-between">
      <h5 class="text-slate-700">Case fra Dokflyt</h5>
      <ul class="flex items-center gap-10">
        <li v-for="link in links" :key="link.name">
          <RouterLink :to="link.path">{{ link.name }}</RouterLink>
        </li>
      </ul>
    </nav>
  </main>
</template>
