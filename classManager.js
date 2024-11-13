export const addClassInElement = (element, className) => {
  if (element && className && !element.classList.contains(className)) {
    element.classList.add(className)
  }
}
export const removeClassInElement = (element, className) => {
  if (element && className && element.classList.contains(className)) {
    element.classList.remove(className)
  }
}
