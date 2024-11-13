import {
  closeModalCartAndAddScroll,
  containerModalCart,
  openModalCartAndRemoveScroll,
} from './modal.js'
import { addProductCart } from './product.js'

const amountArray = []
const ul = document.querySelector('.productsCartList')

// Header Scroll Color Change
let header = document.querySelector('header')

window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0)
})

// Menu
let menu = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menu.onclick = () => {
  menu.classList.toggle('bx-x')
  navbar.classList.toggle('active')
}
// Remove Menu On Scroll
window.onscroll = () => {
  menu.classList.remove('bx-x')
  navbar.classList.remove('active')
}

document
  .querySelector('.nav-icons .cart')
  .addEventListener('click', openModalCartAndRemoveScroll)
document
  .querySelector('#exitMenuCartBtn')
  .addEventListener('click', closeModalCartAndAddScroll)
document
  .querySelector('#alertCartEmpty button')
  .addEventListener('click', closeModalCartAndAddScroll)

containerModalCart.addEventListener('click', (ev) => {
  if (ev.currentTarget === ev.target) {
    closeModalCartAndAddScroll()
  }
})

const cartsButtons = document.getElementsByClassName('bx-cart-alt')
for (let i = 0; i < cartsButtons.length; i++) {
  cartsButtons[i].addEventListener('click', addProductCart)
}
