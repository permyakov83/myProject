(() => {
  // Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

  // Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

  const studentsList = [
    // Добавьте сюда объекты студентов
    {
      lastName: 'Ландау',
      firstName: 'Лев',
      middleName: 'Давыдович',
      birthday: new Date('1980-12-31'),
      yearEnrollment: 2000,
      faculty: 'Физический'
    },
    {
      lastName: 'Толстой',
      firstName: 'Лев',
      middleName: 'Николаевич',
      birthday: new Date('1983-01-01'),
      yearEnrollment: 2023,
      faculty: 'Философский'
    },
    {
      lastName: 'Циолковский',
      firstName: 'Константин',
      middleName: 'Эдуардович',
      birthday: new Date('1981-05-25'),
      yearEnrollment: 2020,
      faculty: 'Математический'
    },
    {
      lastName: 'Виноградов',
      firstName: 'Иван',
      middleName: 'Матвеевич',
      birthday: new Date('1989-06-30'),
      yearEnrollment: 2021,
      faculty: 'Математический'
    },
    {
      lastName: 'Громов',
      firstName: 'Михаил',
      middleName: 'Леонидович',
      birthday: new Date('1981-04-29'),
      yearEnrollment: 2022,
      faculty: 'Физический'
    },
  ]

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.
  function getStudentItem(studentObj) {
    const newLine = document.createElement('tr')
    const cellName = document.createElement('td')
    const cellBirth = document.createElement('td')
    const cellYear = document.createElement('td')
    const cellFac = document.createElement('td')

    cellName.textContent = `${studentObj.lastName} ${studentObj.firstName} ${studentObj.middleName}`
    cellFac.textContent = studentObj.faculty
    cellBirth.textContent = `${getBirthday(studentObj.birthday)} (${getAge(studentObj.birthday)})`
    cellYear.textContent = `${studentObj.yearEnrollment} - ${studentObj.yearEnrollment + 4} (${getCourse(studentObj.yearEnrollment)})`

    newLine.append(cellName)
    newLine.append(cellBirth)
    newLine.append(cellYear)
    newLine.append(cellFac)

    return newLine
  }

  // Преобразование объекта Дата в привычного вида строку
  function getBirthday(birthday) {
    let date = Number(birthday.getDate()) < 10 ? '0' + birthday.getDate() + '.' : birthday.getDate() + '.'

    date = Number(birthday.getMonth()) < 9 ? date + '0' + (Number(birthday.getMonth()) + 1) + '.' : date + (Number(birthday.getMonth()) + 1) + '.'

    date = date + birthday.getFullYear()

    return String(date)
  }

  // Вывод возраста
  function getAge(birthday) {
    const now = new Date()
    const year = 365.25 * 24 * 3600 * 1000
    const age = Math.trunc((now - birthday) / year)

    return age + ' ' + plural(age)
  }

  // Подставляем год, года, лет
  function plural(number, titles = ['год', 'года', 'лет']) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
  }

  // Вычисляем курс
  function getCourse(yearEnrollment) {
    const now = new Date()

    if((Number(yearEnrollment) + 4) < Number(now.getFullYear())) return 'Закончил'

    switch(Number(now.getFullYear()) - Number(yearEnrollment)) {
      case 0: return '1 курс'
      case 1: return Number(now.getMonth()) > 4 ? '2 курс' : '1 курс'
      case 2: return Number(now.getMonth()) > 4 ? '3 курс' : '2 курс'
      case 3: return Number(now.getMonth()) > 4 ? '4 курс' : '3 курс'
      case 4: return Number(now.getMonth()) > 4 ? 'Закончил' : '4 курс'
    }
  }

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

  function renderStudentsTable(studentsArray) {
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    let i = 0

    for(let student of studentsArray) {
      const cellIndex = document.createElement('th')
      const line = getStudentItem(student)

      cellIndex.textContent = ++i

      line.prepend(cellIndex)
      tbody.append(line)
    }
  }

  renderStudentsTable(sortingArray(studentsList, 'lastName', true))

  // Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
  const form = document.querySelector('.my-modal__form')

  // Устанавливаем сегодняшнюю дату максимальной
  function setMaxDate() {
    const inputBirthday = document.getElementById('input-birthday')
    const inputYear = document.getElementById('input-year')
    let nowDate = new Date().getFullYear()
    nowDate = nowDate + '-' + ((new Date().getMonth() < 10) ? ('0' + (new Date().getMonth() + 1)) : (new Date().getMonth() + 1))
    nowDate = nowDate +  '-' + ((new Date().getDate() < 10) ? ('0' + new Date().getDate()) : new Date().getDate())

    inputBirthday.setAttribute('max', nowDate)

    new Date().getMonth() > 7 ? inputYear.setAttribute('max', new Date().getFullYear()) : inputYear.setAttribute('max', (new Date().getFullYear() - 1))
  }
  setMaxDate()

  // Функция очистки сообщения
  function removeMessage(input) {
    const parent = input.parentNode
    const message = parent.querySelector('.message')

    message.textContent = ''
    message.classList.remove('message--valid', 'message--invalid')
  }

  // Валидация
  function myValidation(form) {
    const inputAll = form.querySelectorAll('.form-control')
    const selectAll = form.querySelectorAll('.form-select')

    function setMessage(input, text, error = true) {
      const parent = input.parentNode
      const message = parent.querySelector('.message')

      message.textContent = text
      error ? message.classList.add('message--invalid') : message.classList.add('message--valid')
    }

    function getInputLabel(input) {
      const parent = input.parentNode
      return parent.querySelector('.form-label').textContent
    }

    inputAll.forEach(element => {

      if(element.validity.valueMissing) {
        removeMessage(element)
        setMessage(element, 'Заполните поле ' + getInputLabel(element))
      }
      else {
        switch(element.getAttribute('type')) {
          case 'text':
            removeMessage(element)
            if(element.value.length < element.minLength) {
              setMessage(element, 'Введите в поле ' + getInputLabel(element) + ' больше ' + element.minLength + ' букв!')
            }
            if(element.value.includes(' ')) {
              element.setCustomValidity('onSpace')
              setMessage(element, 'Поле ' + getInputLabel(element) + ' не должно содержать пробелы!')
            }
            else element.setCustomValidity('')
            break
          case 'number':
            removeMessage(element)
            if(Number(element.value) < Number(element.min)) {
              setMessage(element, 'Студентов начали принимать начиная с ' + element.min + ' года')
            }
            if(Number(element.value) > Number(element.min)) {
              setMessage(element, 'Последний год зачисления ' + element.max)
            }
            break
          case 'date':
            removeMessage(element)
            if(new Date(element.value) < new Date(element.min)) {
              setMessage(element, 'Вы вели слишком старого студента')
            }
            if(new Date(element.value) > new Date(element.max)) {
              setMessage(element, 'Такой студент еще не родился')
            }
            break
        }
      }

      if(element.checkValidity()) {
        removeMessage(element)
        setMessage(element, 'Все хорошо!', false)
      }
    })

    selectAll.forEach(element => {
      if(element.validity.valueMissing) {
        removeMessage(element)
        setMessage(element, 'Выберите ' + getInputLabel(element))
      }
      if(element.checkValidity()) {
        removeMessage(element)
        setMessage(element, 'Все хорошо!', false)
      }
    })
  }

  // Функция обертка для функции валидации
  function inputEvent() {
    myValidation(form)
  }

  // Очистка формы
  function clearForm(form) {
    form.reset()
    form.classList.remove('was-validated')
    form.querySelectorAll('.form-control').forEach(el => removeMessage(el))
    form.querySelectorAll('.form-select').forEach(el => removeMessage(el))
  }

  // Отправка формы
  form.addEventListener('submit', event => {
    event.preventDefault()
    myValidation(form)
    form.addEventListener('input', inputEvent)
    form.classList.add('was-validated')

    if (form.checkValidity()) {
      studentsList.push(createStudentObj(form))
      renderStudentsTable(sortingArray(filterStudentList(), 'lastName', true))
      clearForm(form)
      form.removeEventListener('input', inputEvent)
    }
  }, false)

  // Кнопка открытия модального окна с формой
  const showModalBtn = document.querySelector('#modal-show-btn')

  showModalBtn.addEventListener('click', el => {
    const modal = document.querySelector('.my-modal')
    modal.classList.add('show')
  })

  // Функция закрытия модального окна
  function modalClose() {
    const modal = document.querySelector('.my-modal')
    modal.classList.remove('show')
  }

  // Кнопка закрытия модального окна
  const closeModalBtn = document.querySelector('.my-modal__btn.btn-close')

  closeModalBtn.addEventListener('click', el => {
    modalClose()
  })

  // Закрытие модального окна при нажатии Escape
  window.addEventListener('keydown', el => {
    if(el.key === 'Escape') modalClose()
  })

  // Добавляем студента в массив
  function createStudentObj(form) {
    const studentObj = {
      lastName: form.querySelector('#input-lastName').value.trim(),
      firstName: form.querySelector('#input-firstName').value.trim(),
      middleName: form.querySelector('#input-middleName').value.trim(),
      birthday: new Date(form.querySelector('#input-birthday').value),
      yearEnrollment: form.querySelector('#input-year').value,
      faculty: form.querySelector('#input-faculty').value,
    }

    return studentObj
  }

  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
  function sortingArray(array, parameter, arrowUp = false) {
    let resultArray = setFullName(array)
    resultArray = resultArray.sort((a, b) => {
      direction = arrowUp ? a[parameter] < b[parameter] : a[parameter] > b[parameter]
      if(direction) return -1
    })
    return resultArray
  }

  // Соединяем ФИО в одну строку для сортировки
  function setFullName(array) {
    const resultArray = []
    let i = 0

    for(let studentObj of array) {
      resultArray[i] = {
        ... studentObj,
        fullName: studentObj.lastName + studentObj.firstName + studentObj.middleName
      }
      i++
    }

    return resultArray
  }

  // События нажатия на заголовок таблицы
  function clickHeaderTable() {
    const headerTable = document.querySelectorAll('.table-head')

    headerTable.forEach((element) => {
      element.addEventListener('click', () => {
        reversArrow(element, headerTable)
        tableSort(filterStudentList(), element)
      })
    })
  }

  clickHeaderTable()

  // Ищем у кого стрелка и убираем ее
  function deleteArrow(headerTable) {
    headerTable.forEach((element) => {
      if(element.classList.contains('down')) {
        element.classList.remove('down')
        return
      }

      if(element.classList.contains('up')) {
        element.classList.remove('up')
        return
      }
    })
  }

  // // Переворачиваем стрелку или убираем ее
  function reversArrow(element, headerTable) {
    if(element.classList.contains('down')) {
      element.classList.remove('down')
      element.classList.add('up')
      return
    }

    if(element.classList.contains('up')) {
      element.classList.remove('up')
      element.classList.add('down')
      return
    }

      deleteArrow(headerTable)
      element.classList.add('down')
  }

  // Сортируем и перерисовываем таблицу
  function tableSort(array, element) {
    switch(element.id) {
      case 'full-name':
        element.classList.contains('up') ? renderStudentsTable(sortingArray(array, 'fullName')) : renderStudentsTable(sortingArray(array, 'fullName', true))
        break
      case 'birthday':
        element.classList.contains('up') ? renderStudentsTable(sortingArray(array, 'birthday')) : renderStudentsTable(sortingArray(array, 'birthday', true))
        break
      case 'year':
        element.classList.contains('up') ? renderStudentsTable(sortingArray(array, 'yearEnrollment')) : renderStudentsTable(sortingArray(array, 'yearEnrollment', true))
        break
      case 'faculty':
        element.classList.contains('up') ? renderStudentsTable(sortingArray(array, 'faculty')) : renderStudentsTable(sortingArray(array, 'faculty', true))
        break
    }
  }

  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.
  const filterBtn = document.querySelector('.filter-btn')
  const filter = document.querySelector('.filter')
  const filterInputAll = filter.querySelectorAll('.filter__input')

  function filterClear() {
    filterInputAll.forEach(element => element.value = "")
  }

  filterInputAll.forEach(element => {
    element.addEventListener('input', event => renderStudentsTable(sortingArray(filterStudentList(), 'lastName', true)))
  })

  filterBtn.addEventListener('click', event => {
    filter.classList.toggle('show')
    filterBtn.classList.toggle('btn-success')
    filterBtn.classList.toggle('btn-primary')
    if(filterBtn.textContent === "Открыть фильтры") {
      filterBtn.textContent = "Закрыть фильтры"
      return
    }
    if(filterBtn.textContent === "Закрыть фильтры") {
      filterBtn.textContent = "Открыть фильтры"
      renderStudentsTable(sortingArray(studentsList, 'lastName', true))
      filterClear()
      return
    }
  })

  function filterStudentList() {
    const filterStudentArray = []
    const filterName = filter.querySelector('#filter-name')
    const filterBirthday = filter.querySelector('#filter-birthday')
    const filterStartAge = filter.querySelector('#filter-startAge')
    const filterFaculty = filter.querySelector('#filter-faculty')

    function filterStudent(studentObj) {
      if(
        (filterName.value ? studentObj.lastName.toLowerCase().includes(filterName.value.toLowerCase()) : true) &&
        (filterBirthday.value ? getBirthday(studentObj.birthday).includes(filterBirthday.value) : true) &&
        (filterStartAge.value ? String(studentObj.yearEnrollment).includes(filterStartAge.value) : true) &&
        (filterFaculty.value ? studentObj.faculty.toLowerCase().includes(filterFaculty.value.toLowerCase()) : true)
        ) {
        filterStudentArray.push(studentObj)
      }
    }

    for(let studentObj of studentsList) {
      filterStudent(studentObj)
    }

    return filterStudentArray ? filterStudentArray : studentsList
  }

})()
