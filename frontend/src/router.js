import { createRouter, createWebHashHistory } from "vue-router";
import AboutPage from "./views/AboutPage.vue";
import PersonenPage from "./views/PersonenPage.vue";
import ProjektePage from "./views/ProjektePage.vue";
import PersonDetailPage from "./views/PersonDetailPage.vue";
import PublicationsPage from "./views/PublicationsPage.vue";
import ContactPage from "./views/ContactPage.vue";
import ProjektDetailPage from "./views/ProjektDetailPage.vue";
import ThesisPage from "./views/ThesisPage.vue";
import EventsPage from "./views/EventsPage.vue";
import EventDetailPage from "./views/EventDetailPage.vue";

const routes = [
  { path: "/", component: AboutPage },
  { path: "/about", component: AboutPage },
  { path: "/people", name: "PersonenPage", component: PersonenPage },
  { path: "/projects", name: "ProjektePage", component: ProjektePage },
  {
    path: "/projects/:title",
    name: "ProjektDetailPage",
    props: true,
    component: ProjektDetailPage,
  },
  { path: "/publications", component: PublicationsPage },
  {
    path: "/people/:id",
    name: "PersonDetailPage",
    component: PersonDetailPage,
  },
  { path: "/contact", component: ContactPage },
  { path: "/theses", name: "ThesisPage", component: ThesisPage },
  { path: "/events", name: "EventsPage", component: EventsPage },
  {
    path: "/events/:title",
    name: "EventDetailPage",
    props: true,
    component: EventDetailPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Always scroll to the top of the page
    return { top: 0 };
  },
});

export default router;
