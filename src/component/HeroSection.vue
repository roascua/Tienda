<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const sectionRef = ref<HTMLElement | null>(null)
const cards = ref<HTMLElement[]>([])

function handleMouseMove(e: MouseEvent) {
  cards.value.forEach((card) => {
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    const tiltX = dy * -3
    const tiltY = dx * 3
    card.style.setProperty('--tilt-x', `${tiltX}deg`)
    card.style.setProperty('--tilt-y', `${tiltY}deg`)
  })
}

function handleMouseLeave() {
  cards.value.forEach((card) => {
    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  })
}

onMounted(() => {
  if (sectionRef.value) {
    cards.value = Array.from(sectionRef.value.querySelectorAll<HTMLElement>('.hero-card'))
    sectionRef.value.addEventListener('mousemove', handleMouseMove)
    sectionRef.value.addEventListener('mouseleave', handleMouseLeave)
  }
})

onBeforeUnmount(() => {
  if (sectionRef.value) {
    sectionRef.value.removeEventListener('mousemove', handleMouseMove)
    sectionRef.value.removeEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<template>
  <section ref="sectionRef" class="aurora-section relative w-full h-screen overflow-hidden">
    <div class="hero-bg-image" aria-hidden="true" />
    <div class="hero-pattern" aria-hidden="true" />
    <div class="aurora-layer" aria-hidden="true">
      <span class="ribbon ribbon--one" />
      <span class="ribbon ribbon--two" />
      <span class="ribbon ribbon--three" />
      <span class="ribbon ribbon--four" />
    </div>
    <div class="aurora-vignette" aria-hidden="true" />
    <div class="aurora-grain" aria-hidden="true" />

    <div class="sparkle sparkle--1" aria-hidden="true" />
    <div class="sparkle sparkle--2" aria-hidden="true" />
    <div class="sparkle sparkle--3" aria-hidden="true" />
    <div class="sparkle sparkle--4" aria-hidden="true" />
    <div class="sparkle sparkle--5" aria-hidden="true" />
    <div class="sparkle sparkle--6" aria-hidden="true" />
    <div class="sparkle sparkle--7" aria-hidden="true" />
    <div class="sparkle sparkle--8" aria-hidden="true" />

    <div class="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 gap-10">
      <div class="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        <div class="hero-card group w-full border border-white/40 rounded-2xl overflow-hidden flex items-center justify-center" style="min-height: 260px;">
          <span class="text-4xl font-bold tracking-[0.15em] text-center block w-full uppercase px-6 py-8" style="color: #1f151b">
            TIENDA
          </span>
        </div>
        <div class="hero-card hero-card--two group w-full border border-white/40 rounded-2xl overflow-hidden flex items-center justify-center" style="min-height: 260px;">
          <span class="text-4xl font-bold tracking-[0.15em] text-center block w-full uppercase px-6 py-8" style="color: #1f151b">
            SAPHIRUS
          </span>
        </div>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#fff8f9]" />

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
      <svg class="w-6 h-6 text-[#3B2A35]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
</template>

<style scoped>
.aurora-section {
  background-color: #fbf1ec;
  animation: bgPulse 20s ease-in-out infinite alternate;
}

@keyframes bgPulse {
  0% { background-color: #fbf1ec; }
  50% { background-color: #f6e6de; }
  100% { background-color: #fbf1ec; }
}

.hero-bg-image {
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.35;
  background-image: url('https://images.unsplash.com/photo-1603400521630-9f2de124b33b?w=1920&q=80');
  background-size: cover;
  background-position: center;
  filter: saturate(0.5) blur(3px);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.2' fill='%233B2A35' /%3E%3C/svg%3E");
  background-size: 20px 20px;
}

.aurora-layer {
  position: absolute;
  inset: 0;
  z-index: 3;
  overflow: hidden;
}

.ribbon {
  position: absolute;
  left: -25%;
  width: 150%;
  height: 220px;
  border-radius: 50%;
  filter: blur(68px);
  mix-blend-mode: multiply;
  opacity: 0.45;
  will-change: transform, filter;
}

.ribbon--one {
  top: 6%;
  height: 270px;
  background: linear-gradient(90deg, transparent 0%, #f0b9c6 25%, #e8cb98 52%, #cfa9e0 78%, transparent 100%);
  animation: drift1 16s ease-in-out infinite alternate, hueShift 24s linear infinite;
}

.ribbon--two {
  top: 30%;
  height: 210px;
  background: linear-gradient(90deg, transparent 0%, #e8cb98 32%, #f0b9c6 62%, transparent 100%);
  animation: drift2 19s ease-in-out infinite alternate, hueShift 27s linear infinite reverse;
}

.ribbon--three {
  top: 55%;
  height: 230px;
  background: linear-gradient(90deg, transparent 0%, #a8bfec 22%, #cfa9e0 58%, transparent 100%);
  animation: drift3 17s ease-in-out infinite alternate, hueShift 22s linear infinite;
}

.ribbon--four {
  top: 76%;
  height: 190px;
  background: linear-gradient(90deg, transparent 0%, #cfa9e0 35%, #f0b9c6 72%, transparent 100%);
  animation: drift4 21s ease-in-out infinite alternate, hueShift 25s linear infinite reverse;
}

@keyframes drift1 {
  0%   { transform: translate(-6%, 0%)  rotate(-8deg) scaleY(1); }
  100% { transform: translate(6%, 4%)   rotate(-11deg) scaleY(1.15); }
}
@keyframes drift2 {
  0%   { transform: translate(5%, 0%)   rotate(5deg) scaleY(1); }
  100% { transform: translate(-7%, -5%) rotate(8deg) scaleY(0.9); }
}
@keyframes drift3 {
  0%   { transform: translate(-4%, 0%)  rotate(-4deg) scaleY(1); }
  100% { transform: translate(6%, 3%)   rotate(-2deg) scaleY(1.1); }
}
@keyframes drift4 {
  0%   { transform: translate(4%, 0%)   rotate(7deg) scaleY(1); }
  100% { transform: translate(-5%, -4%) rotate(10deg) scaleY(0.95); }
}

@keyframes hueShift {
  0%   { filter: blur(68px) hue-rotate(0deg); }
  50%  { filter: blur(68px) hue-rotate(20deg); }
  100% { filter: blur(68px) hue-rotate(0deg); }
}

.aurora-vignette {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
  background: radial-gradient(circle at 50% 50%, transparent 30%, rgba(59, 42, 53, 0.15) 100%);
}

.aurora-grain {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  z-index: 6;
  pointer-events: none;
  opacity: 0.025;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 220px 220px;
  animation: grainShift 1s steps(6) infinite;
}

@keyframes grainShift {
  0%   { transform: translate(0%, 0%); }
  16%  { transform: translate(-3%, 2%); }
  33%  { transform: translate(2%, -3%); }
  50%  { transform: translate(-2%, -2%); }
  66%  { transform: translate(3%, 1%); }
  83%  { transform: translate(-1%, 3%); }
  100% { transform: translate(0%, 0%); }
}

.sparkle {
  position: absolute;
  border-radius: 50%;
  z-index: 7;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  animation: sparkleFloat 5s ease-in-out infinite alternate;
}

.sparkle--1 { width: 5px; height: 5px; top: 8%;  left: 5%;   animation-duration: 4s;  animation-delay: 0s; }
.sparkle--2 { width: 3px; height: 3px; top: 18%; right: 8%;  animation-duration: 6s;  animation-delay: -1s; }
.sparkle--3 { width: 6px; height: 6px; top: 35%; left: 12%;  animation-duration: 5s;  animation-delay: -0.5s; }
.sparkle--4 { width: 4px; height: 4px; top: 50%; right: 15%; animation-duration: 7s;  animation-delay: -2s; }
.sparkle--5 { width: 5px; height: 5px; top: 65%; left: 8%;   animation-duration: 4.5s; animation-delay: -1.5s; }
.sparkle--6 { width: 3px; height: 3px; top: 78%; right: 10%; animation-duration: 5.5s; animation-delay: -3s; }
.sparkle--7 { width: 4px; height: 4px; top: 45%; left: 70%;  animation-duration: 6.5s; animation-delay: -0.8s; }
.sparkle--8 { width: 6px; height: 6px; top: 88%; left: 40%;  animation-duration: 4.8s; animation-delay: -2.5s; }

@keyframes sparkleFloat {
  0%   { transform: translate(0, 0) scale(0.6); opacity: 0.15; }
  25%  { transform: translate(-18px, -25px) scale(1.4); opacity: 0.8; }
  50%  { transform: translate(15px, -10px) scale(1); opacity: 0.5; }
  75%  { transform: translate(10px, 15px) scale(1.6); opacity: 0.9; }
  100% { transform: translate(-15px, 20px) scale(0.5); opacity: 0.1; }
}

.hero-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(14px);
  opacity: 0;
  translate: 0 28px;
  animation: heroRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.4s;
  transition: transform 0.15s ease-out, background 0.7s ease, box-shadow 0.7s ease;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  transform: perspective(800px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg));
  will-change: transform;
}

.hero-card--two {
  animation-delay: 0.55s;
}

.hero-card:hover {
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 24px 6px rgba(255, 255, 255, 0.3), 0 0 48px 12px rgba(245, 180, 190, 0.15);
}

@keyframes heroRise {
  from { opacity: 0; translate: 0 28px; }
  to   { opacity: 1; translate: 0 0; }
}

@keyframes bounce {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -8px); }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .aurora-section,
  .ribbon,
  .aurora-grain,
  .sparkle,
  .animate-bounce {
    animation: none;
  }
  .hero-card {
    animation: none;
    opacity: 1;
  }
}
</style>
