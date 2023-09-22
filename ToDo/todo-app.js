(function() {
  // Создаем и возвращамем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2')
    appTitle.innerHTML = title
    return appTitle
  }

  // Создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form')
    let input = document.createElement('input')
    let buttonWrapper = document.createElement('div')
    let button = document.createElement('button')

    form.classList.add('input-group', 'mb-3')
    input.classList.add('form-control')
    input.placeholder = 'Введите название нового дела'
    buttonWrapper.classList.add('input-group-append')
    button.classList.add('btn', 'btn-primary')
    button.textContent = 'Добавить дело'

    buttonWrapper.append(button)
    form.append(input)
    form.append(buttonWrapper)
    
    return {
      form,
      input,
      button,
    }
  }

  // Создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul')
    list.classList.add('list-group')
    return list
  }

  function createTodoItem(name) {
    let item = document.createElement('li')
    // Кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div')
    let doneButton = document.createElement('button')
    let deleteButton = document.createElement('button')

    // Устанавливаем стили для элемента списка, а также их в одной группе
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
    item.textContent = name

    buttonGroup.classList.add('btn-group', 'btn-group-sm')
    doneButton.classList.add('btn', 'btn-success')
    doneButton.textContent = 'Готово'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.textContent = 'Удалить'

    // Вкладываем кнопки в одельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton)
    buttonGroup.append(deleteButton)
    item.append(buttonGroup)

    // Приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    }
  }

  function createTodoApp(container, title = 'Список дел') {
    let todoAppTitle = createAppTitle(title)
    let todoItemForm = createTodoItemForm()
    let todoList = createTodoList()

    container.append(todoAppTitle)
    container.append(todoItemForm.form)
    container.append(todoList)

    // Браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {
      // Эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хоитим, чтобы страница перезагружалась при отправки формы
      e.preventDefault()

      // Игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return
      }
      
      let todoItem = createTodoItem(todoItemForm.input.value)

      // Добавляем обработчик на кнопки
      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success')
      })
      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove()
        }
      })

      // Создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item)
      
      // Обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = ''
    })
  }

  window.createTodoApp = createTodoApp
})()