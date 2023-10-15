import { getProductCard } from '../components/productCard.js'
import { getMainTitle } from '../components/mainTitle.js'

// Главная страница
export function getMainPage() {
  const page = document.createElement('div')
  page.classList.add('page', 'main-page', 'container')

  const mainTitle = getMainTitle('Главная страница')

  const list = document.createElement('ul')
  list.classList.add('product-list', 'list-reset')

  list.append(
    getProductCard('Товар1', '400'),
    getProductCard('Товар2', '500'),
    getProductCard('Товар3', '800')
  )

  page.append(mainTitle, list)
  return page
}
