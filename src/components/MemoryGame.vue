<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import sounds from '../utils/sounds'
import ambienceUrl from '../assets/ambience.mp3'

const AMBIENCE_PREF_KEY = 'memory-ambience'

let ambienceAudio = null

const ambienceOn = ref(true)

function startAmbience() {
  if (!ambienceOn.value) return
  if (!ambienceAudio) {
    ambienceAudio = new Audio(ambienceUrl)
    ambienceAudio.loop = true
    ambienceAudio.volume = 0.35
  }
  ambienceAudio.currentTime = 0
  ambienceAudio.play().catch(() => {})
}

function stopAmbience() {
  if (ambienceAudio) ambienceAudio.pause()
}

function toggleAmbience() {
  ambienceOn.value = !ambienceOn.value
  try {
    localStorage.setItem(AMBIENCE_PREF_KEY, ambienceOn.value ? '1' : '0')
  } catch (_) {}
  if (ambienceOn.value) {
    startAmbience()
  } else {
    stopAmbience()
  }
}

const LEVELS = [10, 20, 30, 40, 50] // total cards per level (5, 10, 15, 20, 25 pairs)

const EMOJIS = [
  '🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺', '🎷', '🥁',
  '🚀', '⭐', '🌈', '🔥', '💎', '🌸', '🍀', '🌻', '🐶', '🐱',
  '🦊', '🐻', '🐼', '🦁', '🐸'
]

const currentLevel = ref(1)
const cards = ref([])
const flippedIds = ref(new Set())
const matchedIds = ref(new Set())
const canFlip = ref(true)
const moves = ref(0)
const gameWon = ref(false)
const showLevelComplete = ref(false)


function buildDeck() {
  const pairCount = LEVELS[currentLevel.value - 1] / 2
  const symbols = EMOJIS.slice(0, pairCount)
  const deck = []
  let id = 0
  symbols.forEach((symbol) => {
    deck.push({ id: id++, symbol })
    deck.push({ id: id++, symbol })
  })
  return shuffle(deck)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function initLevel() {
  cards.value = buildDeck()
  flippedIds.value = new Set()
  matchedIds.value = new Set()
  canFlip.value = true
  moves.value = 0
  showLevelComplete.value = false
}

function flipCard(card) {
  if (!canFlip.value || flippedIds.value.has(card.id) || matchedIds.value.has(card.id)) return
  sounds.playFlip()
  flippedIds.value = new Set([...flippedIds.value, card.id])
  const open = [...flippedIds.value]
  if (open.length === 2) {
    canFlip.value = false
    moves.value++
    const [c1, c2] = open.map((id) => cards.value.find((c) => c.id === id))
    if (c1.symbol === c2.symbol) {
      matchedIds.value = new Set([...matchedIds.value, c1.id, c2.id])
      flippedIds.value = new Set()
      sounds.playEat()
      canFlip.value = true
      if (matchedIds.value.size === cards.value.length) {
        levelComplete()
      }
    } else {
      sounds.playWrong()
      setTimeout(() => {
        flippedIds.value = new Set()
        canFlip.value = true
      }, 700)
    }
  }
}

function levelComplete() {
  showLevelComplete.value = true
  sounds.playNewRecord()
}

function nextLevel() {
  if (currentLevel.value < LEVELS.length) {
    currentLevel.value++
    initLevel()
  } else {
    showLevelComplete.value = false
    gameWon.value = true
    sounds.playVictory()
  }
}

function isFlipped(card) {
  return flippedIds.value.has(card.id) || matchedIds.value.has(card.id)
}

const gridCols = computed(() => {
  const n = LEVELS[currentLevel.value - 1]
  if (n <= 10) return 5
  if (n <= 20) return 5
  if (n <= 30) return 6
  if (n <= 40) return 8
  return 10
})

watch(currentLevel, () => initLevel(), { immediate: true })

onMounted(() => {
  try {
    const pref = localStorage.getItem(AMBIENCE_PREF_KEY)
    if (pref === '0') ambienceOn.value = false
  } catch (_) {}
  startAmbience()
})

onUnmounted(() => {
  stopAmbience()
})
</script>

<template>
  <div class="memory-game">
    <div class="top-bar">
      <div class="top-bar-inner">
        <h1 class="title">Jogo da Memória</h1>
        <div class="hud">
          <span class="hud-label">Nível {{ currentLevel }}/{{ LEVELS.length }}</span>
          <span class="hud-moves">{{ moves }} jogadas</span>
        </div>
        <button
          type="button"
          class="ambience-toggle"
          :class="{ off: !ambienceOn }"
          :title="ambienceOn ? 'Desligar som ambiente' : 'Ligar som ambiente'"
          @click="toggleAmbience"
        >
          <span class="ambience-icon">{{ ambienceOn ? '🔊' : '🔇' }}</span>
          <span class="ambience-label">{{ ambienceOn ? 'Som' : 'Mudo' }}</span>
        </button>
        <router-link to="/" class="menu-link">Menu</router-link>
      </div>
    </div>

    <div class="board" :style="{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }">
      <button
        v-for="card in cards"
        :key="card.id"
        type="button"
        class="card-btn"
        :class="{ flipped: isFlipped(card), matched: matchedIds.has(card.id) }"
        @click="flipCard(card)"
      >
        <span class="card-back">?</span>
        <span class="card-front">{{ card.symbol }}</span>
      </button>
    </div>

    <div v-if="showLevelComplete && !gameWon" class="overlay">
      <p class="overlay-title">Nível {{ currentLevel }} completo!</p>
      <p>{{ moves }} jogadas</p>
      <button class="btn-action" @click="nextLevel">
        {{ currentLevel < LEVELS.length ? 'Próximo nível' : 'Ver vitória' }}
      </button>
    </div>

    <div v-if="gameWon" class="overlay win">
      <p class="overlay-title">Parabéns!</p>
      <p>Você completou todos os 5 níveis.</p>
      <button class="btn-action" @click="currentLevel = 1; gameWon = false; initLevel()">
        Jogar novamente
      </button>
    </div>
  </div>
</template>

<style scoped>
.memory-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  max-width: 900px;
}

.title {
  margin: 0;
  font-size: 1.75rem;
  color: #f0f0f0;
  font-family: 'Cardot', system-ui, sans-serif;
  text-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
}

.top-bar {
  width: 100%;
}

.top-bar-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(180deg, rgba(30, 45, 65, 0.95) 0%, rgba(20, 32, 48, 0.98) 100%);
  border-radius: 14px;
  border: 1px solid rgba(100, 150, 200, 0.2);
}

.hud {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.15rem;
}

.hud-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.5);
}

.hud-moves {
  font-size: 1rem;
  font-weight: 700;
  color: #90caf9;
}

.ambience-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: 0.4rem 0.6rem;
  margin-left: auto;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.25);
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, opacity 0.2s;
  font: inherit;
}

.ambience-toggle:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.35);
}

.ambience-toggle.off {
  opacity: 0.7;
}

.ambience-icon {
  font-size: 1.1rem;
  line-height: 1;
}

.ambience-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.menu-link {
  margin-left: 0.5rem;
  padding: 0.4rem 0.7rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.25);
  transition: background 0.2s, border-color 0.2s;
}

.menu-link:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 255, 255, 0.35);
  color: #fff;
}

.board {
  display: grid;
  gap: 0.5rem;
  width: 100%;
  max-width: 560px;
  margin: 0 auto;
  perspective: 800px;
}

.card-btn {
  aspect-ratio: 1;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 0;
  font-size: 1.5rem;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.35s ease, background 0.2s;
  background: transparent;
  border: 1px solid rgba(100, 150, 200, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-btn:hover:not(.flipped):not(.matched) {
  transform: scale(1.03);
}

.card-btn .card-back,
.card-btn .card-front {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  border-radius: 10px;
}

.card-btn .card-back {
  background: linear-gradient(145deg, #3d5a80 0%, #2a4365 100%);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 700;
}

.card-btn .card-front {
  background: linear-gradient(145deg, #4a6fa5 0%, #3d5a80 100%);
  transform: rotateY(180deg);
}

.card-btn.flipped .card-back {
  transform: rotateY(180deg);
}

.card-btn.flipped .card-front {
  transform: rotateY(0);
}

.card-btn.matched .card-front {
  background: linear-gradient(145deg, #2e7d32 0%, #1b5e20 100%);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(10, 22, 40, 0.92);
  color: #e0e0e0;
  z-index: 20;
}

.overlay-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffeb3b;
  margin: 0;
  text-shadow: 0 0 20px rgba(255, 235, 59, 0.4);
}

.overlay p {
  margin: 0;
  font-size: 1rem;
}

.overlay.win .overlay-title {
  color: #66bb6a;
  text-shadow: 0 0 20px rgba(102, 187, 106, 0.5);
}

.btn-action {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #0a1628;
  background: linear-gradient(180deg, #66bb6a 0%, #43a047 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(67, 160, 71, 0.5);
  transition: transform 0.15s, box-shadow 0.15s;
  margin-top: 0.5rem;
}

.btn-action:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(67, 160, 71, 0.6);
}

@media (min-width: 600px) {
  .board {
    gap: 0.6rem;
  }
  .card-btn {
    font-size: 2rem;
  }
}
</style>
