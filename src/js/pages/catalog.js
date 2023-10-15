import { getMainTitle } from '../components/mainTitle.js'
import { getDesc } from '../components/desc.js'

// Страница каталога
export function getCatalogPage() {
  const page = document.createElement('div')
  page.classList.add('page', 'catalog-page', 'container')

  const mainTitle = getMainTitle('Каталог')
  const desc = getDesc('Страница в разработке')

  page.append(mainTitle, desc)
  return page
}
