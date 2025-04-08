import { createRouter, createWebHashHistory } from "vue-router";
import AboutPage from "./views/AboutPage.vue";
import PersonenPage from "./views/PersonenPage.vue";
import LehrePage from "./views/LehrePage.vue";
import ProjektePage from "./views/ProjektePage.vue";
import PersonDetailPage from "./views/PersonDetailPage.vue";
import PublicationsPage from "./views/PublicationsPage.vue";
import ContactPage from "./views/ContactPage.vue";
import ProjektDetailPage from "./views/ProjektDetailPage.vue";
import { path } from "pixi.js";

const routes = [
  { path: "/", component: AboutPage },
  { path: "/about", component: AboutPage },
  { path: "/people", name: "PersonenPage", component: PersonenPage },
  { path: "/projects", name: "ProjektePage", component: ProjektePage },
  {
    path: "/projects/:id",
    name: "ProjektDetailPage",
    props: true,
    component: ProjektDetailPage,
  },
  { path: "/teaching", component: LehrePage },
  { path: "/publications", component: PublicationsPage },
  { path: "/people/:id", name: "PersonDetail", component: PersonDetailPage },
  { path: "/contact", component: ContactPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
