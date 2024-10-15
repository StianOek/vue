import { createRouter, createWebHistory } from "vue-router";
import Characters from "../views/Characters.vue";
import CreateCharacter from "../views/CreateCharacter.vue";
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "characters",
      component: Characters,
    },
    {
      path: "/new-characters",
      name: "new characters",
      component: CreateCharacter,
    },
  ],
});

console.log(router);
