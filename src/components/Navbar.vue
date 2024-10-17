<script setup lang="ts">
import { ref } from "vue";
import { Links } from "../types";
import { RouterLink, useRoute } from "vue-router";

const links = ref<Links>([
  { name: "Characters", path: "/characters/list" },
  { name: "Create Character", path: "/character/new" },
]);

// sjekker at pathen er lik den aktive pathen slik at jeg får en aktiv link indikator
const activeLink = (path: string) => {
  const route = useRoute();
  return route.path === path;
};
</script>

<template>
  <main class="">
    <nav class="max-w-6xl w-full m-auto flex justify-between items-center h-20">
      <RouterLink to="/" class="relative text-white transition-all duration-300 ease-in-out hover:text-emerald-300"> Case </RouterLink>
      <div class="flex items-center gap-10">
        <button class="text-white relative" v-for="link in links" :key="link.path">
          <RouterLink
            :to="link.path"
            class="relative text-white transition-all duration-300 ease-in-out hover:text-emerald-300"
            :class="[activeLink(link.path) ? 'text-emerald-300' : '']"
          >
            {{ link.name }}
          </RouterLink>
        </button>
      </div>
    </nav>
  </main>
</template>
