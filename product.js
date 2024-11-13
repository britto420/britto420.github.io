import { addClassInElement } from './classManager.js'
import { containerModalCart, isCartEmpty } from './modal.js'

const formater = new Intl.NumberFormat('en-us', {
  currency: 'USD',
  style: 'currency',
})

export const productsInCart = []
const productsCartList = document.querySelector('.productsCartList')
const getProductDatas = (element) => {
  const product = element.parentElement.parentElement
  const productImgUrl = product.querySelector('img').src
  const productName = product.querySelector('h2').textContent
  const productPrice = product.querySelector('.alignPrice-btn span').textContent
  return [productImgUrl, productName, productPrice]
}

const getProductInCartWithThisName = (productName) => {
  let productIndex = false

  productsInCart.forEach((product, index) => {
    if (product.name === productName) {
      productIndex = index
      return productIndex
    }
  })
  return productIndex
}

export const addProductInCartList = ({ imgUrl, name, price }) => {
  const productIndex = getProductInCartWithThisName(name)
  if (parseInt(productIndex) >= 0) {
    incrementProductAmount(productIndex)
  } else {
    const amount = 1
    const productPrice = parseFloat(price.replace('$', ''))
    productsInCart.push({ imgUrl, name, productPrice, amount })
    productsCartList.append(createNewProduct({ imgUrl, name, productPrice }))
    updateCountProductInCart()
  }
  updateTotalCartPrice()
}

export const removeProductInCart = (productIndex) => {
  if (productIndex >= 0) {
    productsInCart.splice(productIndex, 1)
    const product = productsCartList.children[productIndex]
    productsCartList.removeChild(product)
    updateTotalCartPrice()
    updateCountProductInCart()
    if (isCartEmpty()) {
      addClassInElement(containerModalCart, 'emptyCart')
    }
  }
}

export const incrementProductAmount = (productIndex) => {
  productsInCart[productIndex].amount++
  updateAmount(productIndex)
}

export const decrementProductAmount = (productIndex) => {
  productsInCart[productIndex].amount--
  updateAmount(productIndex)
  if (productsInCart[productIndex].amount === 0) {
    removeProductInCart(productIndex)
  }
}
const updateCountProductInCart = () => {
  const countProductsinCart = productsInCart.length
  const counterProductsDisplay = document.querySelector('#amountItensCart')
  counterProductsDisplay.textContent = countProductsinCart
}
const updateAmount = (productIndex) => {
  const product = productsCartList.children[productIndex]
  const { amount: currentAmount, productPrice } = productsInCart[productIndex]
  const amountDisplay = product.querySelector('.valueAmount')
  const priceDisplay = product.querySelector('.productPrice')
  priceDisplay.textContent = formater.format(productPrice * currentAmount)

  amountDisplay.textContent = currentAmount

  updateTotalCartPrice()
}

const createElement = (tagName, className, content = null) => {
  const element = document.createElement(tagName)
  addClassInElement(element, className)
  element.textContent = content
  return element
}

const createNewProduct = ({ imgUrl, name, productPrice }) => {
  const newProduct = createElement('li', 'productCart')
  const productContainer = createElement('span')

  const newProductImg = document.createElement('img')
  newProductImg.alt = name
  newProductImg.src = imgUrl

  const newProductName = createElement('p', 'nameProduct', name)

  productContainer.append(newProductImg, newProductName)

  const amountContainer = createElement('span', 'amountProduct')
  const removeAmountProductBtn = createElement(
    'button',
    'removeAmountProduct',
    '-'
  )

  removeAmountProductBtn.addEventListener('click', (ev) => {
    const productCart = ev.currentTarget.closest('.productCart')
    const productList = [...productsCartList.children]
    const productIndex = productList.indexOf(productCart)
    decrementProductAmount(productIndex)
  })

  const amountDisplay = createElement('p', 'valueAmount', 1)
  const addAmountProductBtn = createElement('button', 'addAmountProduct', '+')

  addAmountProductBtn.addEventListener('click', (ev) => {
    const productCart = ev.currentTarget.closest('.productCart')
    const productList = [...productsCartList.children]
    const productIndex = productList.indexOf(productCart)
    incrementProductAmount(productIndex)
  })

  amountContainer.append(
    removeAmountProductBtn,
    amountDisplay,
    addAmountProductBtn
  )

  const priceDisplay = createElement(
    'h3',
    'productPrice',
    formater.format(productPrice)
  )
  const trashBtn = createElement('i')
  trashBtn.className = 'fa-solid fa-trash'

  trashBtn.addEventListener('click', (ev) => {
    const productCart = ev.currentTarget.closest('.productCart')
    const productList = [...productsCartList.children]
    const productIndex = productList.indexOf(productCart)
    removeProductInCart(productIndex)
  })

  newProduct.append(productContainer, amountContainer, priceDisplay, trashBtn)
  return newProduct
}

export const addProductCart = (ev) => {
  const [imgUrl, name, price] = getProductDatas(ev.target)
  addProductInCartList({ imgUrl, name, price })
}

const updateTotalCartPrice = () => {
  const totalPriceCart = productsInCart.reduce((total, product) => {
    const { amount, productPrice } = product
    return total + amount * productPrice
  }, 0)

  const totalPriceDisplay = document.getElementById('priceTotalCart')

  totalPriceDisplay.textContent = `Total: ${formater.format(totalPriceCart)}`
}
