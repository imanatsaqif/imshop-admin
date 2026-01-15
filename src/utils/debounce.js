// utils/debounce.js
export function debounce(fn, delay = 200) {
  let timeout

  const debouncedFn = (...args) => {
    clearTimeout(timeout)
    timeout=setTimeout(() => fn(...args), delay)
  }

  debouncedFn.cancel = () => {
    clearTimeout(timeout)
  }

  return debouncedFn
}