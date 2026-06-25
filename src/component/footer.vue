<template>
  <footer class="relative bg-gradient-to-b from-[#fff8f9] to-[#fce8ec] py-16 px-6 overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
    <div class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-rose-200/10 blur-3xl pointer-events-none" />
    <div class="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-pink-200/10 blur-3xl pointer-events-none" />
    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="text-sm font-semibold text-[#3b2a35] uppercase tracking-wider mb-3">Legal</h3>
          <div class="flex flex-col gap-2 text-sm text-gray-400">
            <a href="#" class="hover:text-rose-500 transition-colors">Términos y condiciones</a>
            <a href="#" class="hover:text-rose-500 transition-colors">Política de privacidad</a>
            <a href="#" class="hover:text-rose-500 transition-colors">Cambios y devoluciones</a>
          </div>
        </div>
      </div>
      <div class="pt-6 border-t border-rose-200/30 dark:border-rose-800/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-400 text-sm text-center">
          &copy; {{ new Date().getFullYear() }} Todos los derechos reservados.
        </p>
        <div class="flex gap-4">
          <a href="#" class="text-gray-400 hover:text-rose-500 transition-colors" aria-label="Instagram">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5z" />
              <circle cx="12" cy="12" r="3" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 5h.01" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-rose-500 transition-colors" aria-label="Facebook">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-rose-500 transition-colors" aria-label="WhatsApp">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11.5a8.5 8.5 0 01-8.5 8.5H5l2.5-2.5A8.5 8.5 0 1121 11.5z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10h.01M12 10h.01M15 10h.01" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
