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
  padding: 2rem 1rem 4rem;
}
.page-content {
  max-width: 560px;
  margin: 0 auto;
}
h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #fff;
}
.lead {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 1.5rem;
}
p {
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 1rem;
  line-height: 1.6;
}
.btn-play {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.85rem 2rem;
  background: linear-gradient(135deg, #535bf2 0%, #646cff 100%);
  color: #fff;
  font-weight: 600;
  border-radius: 8px;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.btn-play:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
}
.title {
  margin: 0;
  font-size: 2rem;
  color: #f0f0f0;
  font-family: 'Cardot', sans-serif;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
}
</style>
