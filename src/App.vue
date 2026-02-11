<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isGame = computed(() => route.name === 'jogo')
</script>

<template>
  <div id="app" :class="{ fullscreen: isGame }">
    <header v-if="!isGame" class="site-header">
      <router-link to="/" class="title">Jogo da Memória</router-link>
      <nav>
        <router-link to="/">Início</router-link>
        <router-link to="/sobre">Sobre</router-link>
        <router-link to="/como-jogar">Como jogar</router-link>
        <router-link to="/privacidade">Privacidade</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  background: #0d1520;
}

#app.fullscreen {
  padding: 0;
  align-items: stretch;
  justify-content: stretch;
}

#app.fullscreen main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(13, 21, 32, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.title {
  margin: 0;
  font-size: 2rem;
  color: #f0f0f0;
  font-family: 'Cardot', sans-serif;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
}

.logo {
  font-weight: 700;
  font-size: 1.25rem;
  color: #fff;
  text-decoration: none;
}

.logo:hover {
  color: #646cff;
}

.site-header nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.site-header nav a {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 0.95rem;
}

.site-header nav a:hover,
.site-header nav a.router-link-active {
  color: #fff;
}

.site-header nav a.nav-play {
  padding: 0.4rem 0.9rem;
  background: #535bf2;
  color: #fff;
  border-radius: 6px;
}

.site-header nav a.nav-play:hover {
  background: #646cff;
}

main {
  flex: 1;
}
</style>
