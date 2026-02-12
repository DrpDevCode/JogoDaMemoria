<template>
  <div class="page sobre">
    <div class="page-content">
      <h1>Sobre o jogo</h1>
      <p>
        <strong>Jogo da Memória</strong> é o clássico jogo de encontrar pares que você joga direto no navegador, sem precisar instalar nada. O objetivo é virar as cartas e formar todos os pares com o menor número de jogadas possível.
      </p>
      <p>
        O jogo possui 10 níveis: começando com 10 cartas e aumentando até 100 cartas no último nível. Cada nível deve ser completado para avançar. O jogo foi feito para ser rápido de carregar e divertido em qualquer dispositivo.
      </p>
      <p>
        Jogo da Memória é um projeto independente, jogável gratuitamente no navegador. Aproveite e boa sorte!
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.sobre {
  padding: 2rem 1rem 4rem;
}
.page-content {
  max-width: 640px;
  margin: 0 auto;
}
h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
}
p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.25rem;
  line-height: 1.65;
}
p strong {
  color: #fff;
}
</style>
