<template>
  <footer class="relative bg-gradient-to-b from-[#fff8f9] to-[#fce8ec] py-16 px-6 overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
    <div class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-rose-200/10 blur-3xl pointer-events-none" />
    <div class="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-pink-200/10 blur-3xl pointer-events-none" />
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
      <p class="text-gray-400 text-sm text-center">
        &copy; {{ new Date().getFullYear() }} Saphirus. Todos los derechos reservados.
      </p>
      <div class="flex gap-6 text-gray-400 text-sm">
        <a href="#" class="hover:text-rose-500 transition-colors">Términos</a>
        <a href="#" class="hover:text-rose-500 transition-colors">Privacidad</a>
        <a href="#" class="hover:text-rose-500 transition-colors">Contacto</a>
      </div>
    </div>
  </footer>
</template>
