let audioContext = null
let soundEnabled = true

function getContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

function beep(frequency, duration, type = 'sine', volume = 0.2) {
  if (!soundEnabled) return
  try {
    const ctx = getContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = frequency
    osc.type = type
    gain.gain.setValueAtTime(volume, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch (_) {}
}

export function playEat() {
  beep(523, 0.06, 'sine', 0.15)
  setTimeout(() => beep(659, 0.08, 'sine', 0.12), 50)
}

export function playGameOver() {
  beep(220, 0.15, 'sawtooth', 0.2)
  setTimeout(() => beep(165, 0.25, 'sawtooth', 0.18), 120)
}

export function playNewRecord() {
  beep(523, 0.08, 'sine', 0.15)
  setTimeout(() => beep(659, 0.08, 'sine', 0.14), 80)
  setTimeout(() => beep(784, 0.12, 'sine', 0.16), 160)
}

export function playFlip() {
  beep(400, 0.04, 'sine', 0.12)
}

export function playWrong() {
  beep(200, 0.1, 'sine', 0.15)
  setTimeout(() => beep(180, 0.12, 'sine', 0.12), 80)
}

export function playVictory() {
  beep(523, 0.1, 'sine', 0.18)
  setTimeout(() => beep(659, 0.1, 'sine', 0.16), 100)
  setTimeout(() => beep(784, 0.1, 'sine', 0.16), 200)
  setTimeout(() => beep(1047, 0.2, 'sine', 0.18), 300)
}

export function setSoundEnabled(enabled) {
  soundEnabled = !!enabled
}

export function isSoundEnabled() {
  return soundEnabled
}

export default { playEat, playGameOver, playNewRecord, playFlip, playWrong, playVictory, setSoundEnabled, isSoundEnabled }
