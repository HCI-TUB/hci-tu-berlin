import { createRouter, createWebHashHistory } from 'vue-router';
import AboutPage from './views/AboutPage.vue';
import PersonenPage from './views/PersonenPage.vue';
import LehrePage from './views/LehrePage.vue';
import ProjektePage from './views/ProjektePage.vue';
import PersonDetailPage from './views/PersonDetailPage.vue';
import PublicationsPage from './views/PublicationsPage.vue';
import ContactPage from './views/ContactPage.vue';


const routes = [
  { path: '/', component: AboutPage },
  { path: '/about', component: AboutPage },
  { path: '/people', name: 'PersonenPage', component: PersonenPage },
  { path: '/projects', component: ProjektePage },
  { path: '/teaching', component: LehrePage },
  { path: '/publications', component: PublicationsPage },
  { path: '/people/:id', name: 'PersonDetail', component: PersonDetailPage },
  { path: '/contact', component: ContactPage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;