<template>
  <div class="page como-jogar">
    <div class="page-content">
      <h1>Como jogar</h1>

      <section>
        <h2>Objetivo</h2>
        <p>
          Encontre todos os pares de cartas. Clique em uma carta para virá-la e depois em outra. Se formarem um par, elas permanecem viradas. Caso contrário, são desviradas e você tenta novamente.
        </p>
      </section>

      <section>
        <h2>Níveis</h2>
        <ul>
          <li><strong>Nível 1:</strong> 10 cartas (5 pares)</li>
          <li><strong>Nível 2:</strong> 20 cartas (10 pares)</li>
          <li><strong>Nível 3:</strong> 30 cartas (15 pares)</li>
          <li><strong>Nível 4:</strong> 40 cartas (20 pares)</li>
          <li><strong>Nível 5:</strong> 50 cartas (25 pares)</li>
          <li><strong>Nível 6:</strong> 60 cartas (30 pares)</li>
          <li><strong>Nível 7:</strong> 70 cartas (35 pares)</li>
          <li><strong>Nível 8:</strong> 80 cartas (40 pares)</li>
          <li><strong>Nível 9:</strong> 90 cartas (45 pares)</li>
          <li><strong>Nível 10:</strong> 100 cartas (50 pares)</li>
        </ul>
      </section>

      <section>
        <h2>Dicas</h2>
        <ul>
          <li>Memorize a posição das cartas quando elas forem desviradas.</li>
          <li>Complete cada nível para desbloquear o próximo.</li>
          <li>Quanto menos jogadas, melhor — tente encontrar os pares com eficiência.</li>
        </ul>
      </section>

      <p class="cta">
        <router-link to="/jogo" class="link">Ir para o jogo →</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.como-jogar {
  padding: 1rem 0.75rem 3rem;
}
.page-content {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 0.25rem;
  box-sizing: border-box;
}
h1 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  margin-bottom: 1rem;
  color: #fff;
}
h2 {
  font-size: clamp(1.1rem, 3vw, 1.25rem);
  color: rgba(255, 255, 255, 0.95);
  margin: 1.25rem 0 0.5rem;
}
section:first-of-type h2 {
  margin-top: 0;
}
p, li {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.65;
  margin-bottom: 0.5rem;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}
ul {
  padding-left: 1rem;
  margin-bottom: 1rem;
}
li {
  margin-bottom: 0.35rem;
}
kbd {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  font-size: 0.85em;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  margin: 0 0.1rem;
}
.cta {
  margin-top: 1.5rem;
}
.link {
  color: #646cff;
  font-weight: 500;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
.link:hover {
  color: #535bf2;
  text-decoration: underline;
}
@media (min-width: 600px) {
  .como-jogar {
    padding: 2rem 1rem 4rem;
  }
}
</style>
