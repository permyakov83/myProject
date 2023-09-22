(() => {
  // Этап 1. Создайте функцию, генерирующую массив парных чисел.
  // Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
  // count - количество пар.
  const container = document.getElementById('duble-app')
  const displayWidth = document.documentElement.clientWidth
  const displayHeight = document.documentElement.clientHeight
  const menu = createMenu(4, 10)
  let headerHeight
  let cardList
  let ratioWidthHeight

  calcRatioWidthHeight()
  function calcRatioWidthHeight() {
    if(displayWidth > displayHeight) {
      ratioWidthHeight = displayHeight / 350
    }

    if(displayWidth < displayHeight) {
      ratioWidthHeight = displayWidth / 350
    }
  }

  function createNumbersArray(count) {
    const NumbersArray = []
    let j = 1

    for(i = 0; i < count * 2; i++) {
      NumbersArray[i] = j
      i++
      NumbersArray[i] = j
      j++
    }
    return NumbersArray
  }

  // Этап 2. Создайте функцию перемешивания массива.
  // Функция принимает в аргументе исходный массив и возвращает перемешанный массив.
  //arr - массив чисел

  function shuffle(arr) {
    const count = arr.length

    for(let i in arr){
      let j = Math.round(Math.random() * (count - 1))
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
    return arr
  }

  // Создаем и возвращаем заголовок приложения
  function createAppTitle(title = "Найди пару") {
    const titleContainer = document.createElement('div')
    const appTitle = document.createElement('h1')
    titleContainer.classList.add('title-container')
    appTitle.classList.add('app-title')
    appTitle.innerHTML = title
    titleContainer.append(appTitle)
    return titleContainer
  }

  // Создаем меню с кнопками
  function createMenu(minCol, maxRow) {
    const menu = document.createElement('div')
    const menuList = document.createElement('ul')
    const menuItemArray = createMenuItemArray(minCol, maxRow)

    menu.classList.add('menu')
    menuList.classList.add('menu__list', 'list-reset')

    menu.append(menuList)

    for(let menuItem of menuItemArray) {
      menuList.append(menuItem.menuItem)
    }

    createMenuButtonClickEvent(menuItemArray)

    return {
      menu,
      menuList,
      menuItemArray,
    }
  }

  // Создаем обработчик события кнопок в массиве из элементов меню
  function createMenuButtonClickEvent(menuItemArray) {
    for(let menuItem of menuItemArray) {
      menuItem.menuButton.addEventListener('click', () => {
        allMenuButtonOn()
        menuItem.menuButton.disabled = true
        cardList.remove()
        let duble = searchButtonOn(menuItemArray)
        cardList = createPlayingField(duble)
        cardList.style.setProperty('--columns', Math.sqrt(duble * 2))
        container.append(cardList)
        duble = searchButtonOn(menuItemArray)
      })
    }
  }

  // Ищем какая кнопка нажата и возвращаем количество пар
  // Меняем параметры игрового поля, отступов, шрифтов
  function searchButtonOn(menuItemArray) {
    for(let menuItem of menuItemArray) {
      if(menuItem.menuButton.disabled) {
        switch(menuItem.menuButton.textContent) {
          case '10x10':
            cardList.style.fontSize = ratioWidthHeight * 1 + 'rem'
            cardList.style.gap = '0.1rem'
            return 50
          case '8x8':
            cardList.style.fontSize = ratioWidthHeight * 1.2 + 'rem'
            cardList.style.gap = '0.2rem'
            return 32
          case '6x6':
            cardList.style.fontSize = ratioWidthHeight * 1.5 + 'rem'
            cardList.style.gap = '0.3rem'
            return 18
          default:
            cardList.style.fontSize = ratioWidthHeight * 2.5 + 'rem'
            return 8
        }
      }
    }
  }

  // Включаем все выключенные кнопки
  function allMenuButtonOn() {
    const menuButtonArray = document.querySelectorAll('.menu__btn')
    for(let button of menuButtonArray) {
      if(button.disabled)
      button.disabled = false
    }
  }

  // Создаем элемент списка меню с кнопкой и возвращаем их
  function createMenuItem(col, row) {
    const menuItem = document.createElement('li')
    const menuButton = document.createElement('button')

    menuItem.classList.add('menu__item')
    menuButton.classList.add('menu__btn', 'btn')
    menuButton.textContent = `${col}x${row}`

    menuItem.append(menuButton)

    return {
      menuItem,
      menuButton
    }
  }

  // Создаем массив с элементами меню и возвращаем его
  function createMenuItemArray(minCol, maxRow) {
    const menuItemArray = []
    let j = minCol

    for(i = 0; j <= maxRow; i++) {
      menuItemArray[i] = createMenuItem(j, j)
      // При загрузке выключаем первую кнопку
      if(j === minCol) menuItemArray[i].menuButton.disabled = true
      j += 2
    }

    return menuItemArray
  }

  // Создаем и возвращаем контейнер для карточек
  function createCardList() {
    const cardList = document.createElement('ul')
    cardList.classList.add('card-list', 'list-reset')
    return cardList
  }

  // Создаем и возвращаем карточку с номером
  function createCardItem(number) {
    const cardItem = document.createElement('li')
    const cardFront = document.createElement('div')
    const cardBack = document.createElement('div')
    cardItem.classList.add('card-item')
    cardFront.classList.add('card', 'card__front')
    cardBack.classList.add('card', 'card__back')
    cardBack.textContent = number
    cardItem.append(cardFront)
    cardItem.append(cardBack)
    return {
      cardItem,
      cardBack,
    }
  }

  // Создаем и возвращаем массив из карточек
  function createCardsArray(numbersArray) {
    const cardsArray = []
    let i = 0

    for(let number of numbersArray) {
      cardsArray[i] = createCardItem(number)
      i++
    }
    addEventCardClick(cardsArray)
    return cardsArray
  }

  // Добавляем массив с карточками в DOM
  function addCardToDOM(cardList, cardsArray) {
    for(let cardItem of cardsArray) {
      cardList.append(cardItem.cardItem)
    }
  }

  // Добавляем обработчик нажатия на карточку
  function addEventCardClick(cardsArray) {

    for(let card of cardsArray) {

      card.cardItem.addEventListener('click', () => {
        let openCardArray = searchOpenCard(cardsArray)
        let dubleCard = []

        if(openCardArray.length < 1) {
          card.cardItem.classList.toggle('card--open')
          return
        }

        if(openCardArray.length < 2) {
          card.cardItem.classList.toggle('card--open')
          openCardArray = searchOpenCard(cardsArray)
          setTimeout(() => {
            if(cardOpenComparison(openCardArray[0], openCardArray[1])) {
              for(let openCard of openCardArray) {
                openCard.cardItem.classList.remove('card--open')
                openCard.cardItem.classList.add('card--duble')
              }
              dubleCard = document.querySelectorAll('.card--duble')
              if(cardsArray.length === dubleCard.length) {
                victory()
              }
              return
            }

            for(let openCard of openCardArray) {
              openCard.cardItem.classList.remove('card--open')
            }
          }, 600)
        }
      })

    }
  }

  // Создаем сообщение о победе и кнопку рестарт
  function victory() {
    const field = document.querySelector('.card-list')
    const victoryContainer = document.createElement('div')
    const message = document.createElement('span')
    const restartBtn = document.createElement('button')

    victoryContainer.classList.add('victory')
    message.classList.add('victory__msg')
    restartBtn.classList.add('restart__btn', 'btn')
    message.textContent = 'Вы справились!'
    restartBtn.textContent = 'Ещё разок?'
    restartBtn.style.fontSize = ratioWidthHeight * 1 + 'rem'
    victoryContainer.append(message)
    victoryContainer.append(restartBtn)
    field.append(victoryContainer)

    restartBtn.addEventListener('click', () => {
      let duble = searchButtonOn(menu.menuItemArray)
      victoryContainer.remove()
      cardList.remove()
      cardList = []
      cardList = createPlayingField(duble)
      cardList.style.setProperty('--columns', Math.sqrt(duble * 2))
      container.append(cardList)
      searchButtonOn(menu.menuItemArray)
    })
  }

  // Сравниваем значения открытых карточек
  function cardOpenComparison(cardItem1, cardItem2) {
    let card1
    let card2
    if(cardItem1) {
      card1 = cardItem1.cardBack.textContent
    }
    if(cardItem2) {
      card2 = cardItem2.cardBack.textContent
    }
    return card1 === card2
  }

  // Ищем и возвращаем открытые карточки
  function searchOpenCard(cardsArray) {
    const openItem = document.querySelectorAll('.card--open')
    const openCard = []
    let i = 0
    for(let card of cardsArray) {
      for(let item of openItem) {
        if(card.cardItem === item) {
          openCard[i] = card
          i++
        }
      }
    }
    return openCard
  }

  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами.
  // На основе этого массива вы можете создать DOM-элементы карточек.
  // У каждой карточки будет свой номер из массива произвольных чисел.
  // Вы также можете создать для этого специальную функцию. count - количество пар.

  function createPlayingField(count = 8) {
    const numbersArray = shuffle(createNumbersArray(count))
    const cardsArray = createCardsArray(numbersArray)
    const cardList = createCardList()

    if(displayWidth > displayHeight) {
      container.style.maxWidth = `calc(100vh - ${headerHeight}px - 20px)`
      cardList.style.height = `calc(100vh - ${headerHeight}px - 20px)`
    }

    if(displayWidth < displayHeight) {
      container.style.maxWidth = '100vw'
      cardList.style.height = '100vw'
    }

    addCardToDOM(cardList, cardsArray)
    return cardList
  }

  function createHeader(titleApp, menu) {
    const header = document.createElement('div')

    header.classList.add('header')
    header.append(titleApp)
    header.append(menu.menu)
    return header
  }

  function startGame() {
    const titleApp = createAppTitle()
    const header = createHeader(titleApp, menu)

    container.append(header)

    titleApp.style.fontSize = ratioWidthHeight * 2 + 'rem'
    menu.menuList.style.fontSize = ratioWidthHeight * 1 + 'rem'
    headerHeight = header.offsetHeight
    cardList = createPlayingField()
    container.append(cardList)
    cardList.style.fontSize = ratioWidthHeight * 2.5 + 'rem'
  }

  document.addEventListener('DOMContentLoaded', () => {
    startGame()
  })

})()
