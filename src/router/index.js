import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SobreView from '../views/SobreView.vue'
import ComoJogarView from '../views/ComoJogarView.vue'
import PrivacidadeView from '../views/PrivacidadeView.vue'
import MemoryGame from '../components/MemoryGame.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Jogo da Memória - Início' } },
  { path: '/sobre', name: 'sobre', component: SobreView, meta: { title: 'Jogo da Memória - Sobre' } },
  { path: '/como-jogar', name: 'como-jogar', component: ComoJogarView, meta: { title: 'Jogo da Memória - Como jogar' } },
  { path: '/privacidade', name: 'privacidade', component: PrivacidadeView, meta: { title: 'Jogo da Memória - Privacidade' } },
  { path: '/jogo', name: 'jogo', component: MemoryGame, meta: { title: 'Jogo da Memória - Jogo' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta?.title ?? 'Jogo da Memória'
})

export default router
