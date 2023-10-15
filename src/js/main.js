import Navigo from 'navigo'
import { getHeader } from './components/header.js'
import { getPageContainer } from './components/pageContainer.js'
// import { getMainTitle } from './components/mainTitle.js'
// import { getDesc } from './components/desc.js'

const app = document.getElementById('app')

const header = getHeader()
const pageContainer = getPageContainer()

export const router = new Navigo('/')

router.on('/', async () => {
  pageContainer.innerHTML = ''
  const moduleMain = await import('./pages/main.js')
  const mainPage = moduleMain.getMainPage()
  pageContainer.append(mainPage)
})

router.on('/catalog', async () => {
  pageContainer.innerHTML = ''
  const moduleCatalog = await import('./pages/catalog.js')
  const catalogPage = moduleCatalog.getCatalogPage()
  pageContainer.append(catalogPage)
})

router.on('/basket', async () => {
  pageContainer.innerHTML = ''
  const moduleBasket = await import('./pages/basket.js')
      const basketPage = moduleBasket.getBasketPage()
      pageContainer.append(basketPage)
})

router.on('/product/:title', async ({ data }) => {
  pageContainer.innerHTML = ''
  const moduleProduct = await import('./pages/product.js')
  const productPage = moduleProduct.getProductPage(data.title)
  pageContainer.append(productPage)
})

app.append(header, pageContainer)

router.resolve()
