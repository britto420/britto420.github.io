import { addClassInElement, removeClassInElement } from './classManager.js'

export const containerModalCart = document.querySelector('#containerModalCart')

export const openModalCartAndRemoveScroll = () => {
  addClassInElement(containerModalCart, 'show')
  addClassInElement(document.body, 'noScroll')
  if (isCartEmpty()) {
    addClassInElement(containerModalCart, 'emptyCart')
  } else {
    removeClassInElement(containerModalCart, 'emptyCart')
  }
}
export const closeModalCartAndAddScroll = () => {
  removeClassInElement(containerModalCart, 'show')
  removeClassInElement(document.body, 'noScroll')
}

export const isCartEmpty = () => {
  const ulCart = document.querySelector('.productsCartList')
  return !(ulCart.children.length > 0)
}
