import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('dark-mode') === 'true')

function applyDarkClass(val: boolean) {
  if (val) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

applyDarkClass(isDark.value)

watch(isDark, (val) => {
  localStorage.setItem('dark-mode', String(val))
  applyDarkClass(val)
})

export function useDarkMode() {
  function toggleDark() {
    isDark.value = !isDark.value
  }
  return { isDark, toggleDark }
}