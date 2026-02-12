<template>
  <div class="page home">
    <div class="page-content">
      <h1 class="title">Jogo da Memória</h1>
      <p class="lead">
        Encontre os pares de cartas em 10 níveis de dificuldade: 10, 20, 30, 40, 50, 60, 70, 80, 90 e 100 cartas.
      </p>
      <p>
        Jogo da Memória é um jogo de navegador gratuito. Clique nas cartas para virá-las e forme os pares. Complete todos os 10 níveis para vencer.
      </p>
      <router-link to="/jogo" class="btn-play">Jogar agora</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  text-align: center;
  padding: 1rem 0.75rem 3rem;
}
.page-content {
  max-width: 560px;
  margin: 0 auto;
  padding: 0 0.25rem;
}
h1 {
  font-size: clamp(1.5rem, 6vw, 2.5rem);
  margin-bottom: 0.75rem;
  color: #fff;
}
.lead {
  font-size: clamp(1rem, 3vw, 1.2rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 1rem;
}
p {
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}
.btn-play {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  min-height: 48px;
  min-width: 160px;
  background: linear-gradient(135deg, #535bf2 0%, #646cff 100%);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  box-sizing: border-box;
}
.btn-play:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
}
.title {
  margin: 0;
  font-size: clamp(1.5rem, 6vw, 2rem);
  color: #f0f0f0;
  font-family: 'Cardot', sans-serif;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
}
@media (min-width: 600px) {
  .home {
    padding: 2rem 1rem 4rem;
  }
  .btn-play {
    padding: 0.85rem 2rem;
  }
}
</style>
