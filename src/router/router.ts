import { createRouter, createWebHistory } from "vue-router";
import Characters from "../views/Characters.vue";
import Character from "../views/Character.vue";
import CreateCharacter from "../views/CreateCharacter.vue";
import Home from "../views/Home.vue";
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/characters/list",
      name: "characters",
      component: Characters,
    },
    {
      path: "/character/new",
      name: "new characters",
      component: CreateCharacter,
    },
    {
      path: "/character/:id",
      name: "character",
      component: Character,
    },
  ],
});

console.log(router);
