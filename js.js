let userAnswers = {
    "name": '',
    "age": '',
        "startNumber": '',
    "finishNumber": '',
    "projectBuilder": '',
    "programmingLanguage": '',
    "requiredCheckbox": '',
    "notRequiredCheckbox": ''
    }

    let filedsOfForm = Object.keys(userAnswers)

let updateSubmittedListItemValue = function (text, type, peremennya, peremennyaTwo, extraText) {
  if (peremennya === userAnswers.startNumber) {
      type.textContent = text + peremennya + extraText + peremennyaTwo
      type.value = text + peremennya + extraText + peremennyaTwo //убрать можно такие штуки
  } else if (peremennyaTwo === undefined) {
       type.textContent = text + peremennya
       type.value = text + peremennya
   } else {
       type.textContent = text + peremennya + peremennyaTwo
       type.value = text + peremennya + peremennyaTwo
   }
}

let submittedListItemProgramBuilder = document.getElementsByClassName('submittedListItemProgramBuilder')[0]
let submittedListItemProgramLanguages  = document.getElementsByClassName('submittedListItemProgramLanguages')[0]

let submittedListItemAge  = document.getElementsByClassName('submittedListItemAge')[0]
let submittedListItemCheckboxes  = document.getElementsByClassName('submittedListItemCheckboxes')[0]


let submittedListItemName  = document.getElementsByClassName('submittedListItemName')[0]

let inputForRangeFromZero = document.getElementsByClassName('inputForRangeFromZero')[0]

let inputForRangeTo = document.getElementsByClassName('inputForRangeTo')[0]
let inputForRangeScroll = document.getElementsByClassName('inputForRangeScroll')[0]
let mainContainerForRadio = document.getElementsByClassName('mainContainerForRadio')[0]
mainContainerForRadio.addEventListener('change', (e) => {
    userAnswers.programmingLanguage = e.target.value
    console.log(e.target)
    e.target.classList.add('choosedTypeOfProgrammingLanguage')
    updateSubmittedListItemValue("Radio: ", submittedListItemProgramLanguages, userAnswers.programmingLanguage)
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    areAllAFieldsFilledIn()
})

let selectOfProjectBuilders = document.getElementsByClassName("selectOfProjectBuilders")[0]
let selectOfProgrammingLanguages = document.getElementsByClassName("selectOfProgrammingLanguagesJS")[0]
let inputToEnterAge = document.getElementsByClassName("inputToEnterAge")[0]
let requiredCheckbox = document.getElementsByClassName("requiredCheckbox")[0]
let notRequiredCheckbox = document.getElementsByClassName("notRequiredCheckbox")[0]
let buttonToCleanForm = document.getElementsByClassName("buttonToCleanForm")[0]
let inputForName = document.getElementsByClassName("inputForName")[0]





let buttonToSubmitForm = document.getElementsByClassName("button")[0];
/*
let saveInfo = function (info) {
    return info
}

 */
let massiveToCheckName = [];
let massiveToCheckNameForLetters = [];

let areAllAFieldsFilledIn = function () { //здесь данные надо брать из localStorage, чтобы после перезагрузки введенные данные не терялись
    console.log("Смотри сюда" + userAnswers.name) // а ещё здесь при перезагрузке, если поля визуально почти все заполнены,но не заполнено
        // только одно. И нажимаешь на это одно поле, все равно false выходит. Там что у объекта не сохраняются значения? Только у input value?
    console.log("Сюда" + filedsOfForm.slice(0, filedsOfForm.length - 1))
    let newOne = filedsOfForm.slice(0, filedsOfForm.length - 1).every(filed => {
        console.log(filed)
        /*  filed = userAnswers[filed];
          console.log("Вот" + filed)

         */
        console.log("Вот итог" + userAnswers[filed])
        console.log("Ответ" + userAnswers[filed] !== false || userAnswers[filed] !== '')
       return  userAnswers[filed] !== ''  //    return  userAnswers[filed] !== false || userAnswers[filed] !== ''
    })
    if (!newOne) { //получилось
        console.log(newOne)
        console.log("вы не вписали имя")
        console.log(name)
        buttonToSubmitForm.disabled = true;
        buttonToSubmitForm.classList.add("disabled")

    } else {
        console.log("я здесь")
        buttonToSubmitForm.disabled = false
        buttonToSubmitForm.classList.remove("disabled")

    }
}

areAllAFieldsFilledIn()

requiredCheckbox.addEventListener('change', () => {
    if (requiredCheckbox.checked) {
        userAnswers.requiredCheckbox = 'requiredCheckbox'
        requiredCheckbox.value = 'Обязательный чекбокс'
    } else {
        userAnswers.requiredCheckbox = ''
    }

    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    areAllAFieldsFilledIn()
})
notRequiredCheckbox.addEventListener('change', () => {
    if (notRequiredCheckbox.checked) {
        userAnswers.notRequiredCheckbox = 'notRequiredCheckbox'
        notRequiredCheckbox = 'notRequiredCheckbox'
    } else {
        userAnswers.notRequiredCheckbox = ''
    }
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    areAllAFieldsFilledIn()
})
inputForName.addEventListener('input', (e) => {
//разобраться в условиях

   let  checkingName = e.target.value;

   if (checkingName === "a") {
       inputToEnterAge.value = 1
   }
    massiveToCheckNameForLetters = checkingName.split('')
    let doesNameHasOnlyLettersAndSpaces = massiveToCheckNameForLetters.every(element => element ===  /[a-zA-Zа-яА-Я\s]/.test(element))
    if (!doesNameHasOnlyLettersAndSpaces) {
        console.log(" всё в порядке вроде")
    } else {
        console.log("ошибка, нельзя вводить цифры и другие символы, только буквы и пробелы")
    }
    massiveToCheckName = checkingName.split(' ')
    console.log(massiveToCheckName)
let doesEveryNameHaveMoreThanTwoLetters = massiveToCheckName.every(element => element.length >= 2);

    let lengthOfName = massiveToCheckName.length
    if (lengthOfName !== 3) {
        console.log("ошибка, имени должно быть 3") //придумать что-то, как показать ошибку через стили?

    }
if (!doesEveryNameHaveMoreThanTwoLetters) {
    console.log("каждое имя не должно быть меньше 2 букв")
}
     /*   inputForName.value = name; это же буквально одно и то же, что и name = e.target.value; вроде пока я проверки не сделала*/
  /*  updateSubmittedListItemValue("ФИО: ", submittedListItemName, name) не нужная штука у инпутов их убрать надо вроде и заменить на функции,
  * сами переменные в формах типа вроде*/
    userAnswers.name = e.target.value;
  /*  saveInfo(userAnswers.name) */

  /*  areAllAFieldsFilledIn()

   */
    areAllAFieldsFilledIn()
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    console.log( userAnswers.name)
    return userAnswers.name
})
console.log("Вне" + userAnswers.name)
 let userAnswersLocalStorage =  JSON.parse(localStorage.getItem('userAnswers')) // inputForName.value =  JSON.parse(localStorage.getItem('user')) выведенный объект




console.log(userAnswersLocalStorage)
inputForName.value = userAnswersLocalStorage.name

inputToEnterAge.addEventListener('input', (e) => {

    userAnswers.age = e.target.value;
    inputToEnterAge.value =  userAnswers.age;
    updateSubmittedListItemValue("Возраст: ", submittedListItemAge,  userAnswers.age)
    areAllAFieldsFilledIn()
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
})

buttonToCleanForm.addEventListener("click", () => {
    selectOfProjectBuilders.value = '';
    selectOfProgrammingLanguages.value = '';
    requiredCheckbox.value = '';
    notRequiredCheckbox.value = '';
    inputToEnterAge.value = '';
    inputForName.value = '';
    inputForRangeFromZero.value = '';
    inputForRangeTo.value = '';
    window.localStorage.clear()
})

let time = new Date()
let showThisYear = time.getFullYear()
console.log(showThisYear)

let infoOfApplicant = document.getElementsByClassName("infoOfApplicant")[0]
infoOfApplicant.textContent = "© Гараева Рената Ринатовна, 1999-" + showThisYear


let popup = document.getElementsByClassName("popup")[0];


let submittedListItemRange = document.getElementsByClassName('submittedListItemRange')[0]

let  updateSubmittedListItemRangeValue = function (firstNumber, secondNumber) {
    submittedListItemRange.textContent = "Диапазон с " + firstNumber + " до " + secondNumber
}

inputForRangeFromZero.addEventListener('input', (e) => {
    let enteredStartNumber = Number(e.target.value)
    if (enteredStartNumber <= 150 && enteredStartNumber >= 0) {
        inputForRangeFromZero.classList.remove('notAllowed')
        inputForRangeFromZero.textContent = enteredStartNumber;
        userAnswers.startNumber = enteredStartNumber
      /*  saveInfo(userAnswers.startNumber) */
      /*  updateSubmittedListItemRangeValue() */

        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))

    } else {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
        inputForRangeFromZero.classList.add('notAllowed')
    }
    areAllAFieldsFilledIn()
})

inputForRangeTo.addEventListener('input', (e) => {
    let enteredFinishNumber = Number(e.target.value)

    if (enteredFinishNumber >=  userAnswers.startNumber && enteredFinishNumber <= 150 ) {      //вот здесь вопросы
        inputForRangeTo.classList.remove('notAllowed')
        inputForRangeTo.textContent = enteredFinishNumber;
        userAnswers.finishNumber = enteredFinishNumber

        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    } else {
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
          inputForRangeTo.classList.add('notAllowed')
    }
} )
selectOfProjectBuilders.addEventListener('change', (e) => {
    userAnswers.projectBuilder = e.target.value
    areAllAFieldsFilledIn()
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    areAllAFieldsFilledIn()
})


buttonToSubmitForm.addEventListener('click', () => {

    updateSubmittedListItemValue("ФИО: ", submittedListItemName, userAnswers.name)
    updateSubmittedListItemValue("Выбранные checkbox: ", submittedListItemCheckboxes, requiredCheckbox.value, notRequiredCheckbox.value)
    updateSubmittedListItemValue("Возраст: ", submittedListItemAge, userAnswers.age)
    updateSubmittedListItemValue("Radio: ", submittedListItemProgramLanguages, userAnswers.programmingLanguage)
    updateSubmittedListItemValue("Диапазон с ", submittedListItemRange, userAnswers.startNumber, userAnswers.finishNumber, " до ")
    updateSubmittedListItemValue("Select: ",  submittedListItemProgramBuilder, userAnswers.projectBuilder)

    popup.showModal()

})
let closeBottonForPopup = document.getElementsByClassName("closeBottonForPopup")[0];

closeBottonForPopup.addEventListener('click', () => {
    popup.close()
})

popup.addEventListener('click', ({areaOfPopup, notAreaOfPopup}) => {
    let popupArea = areaOfPopup
    let clickOnBackground = notAreaOfPopup === popupArea
    if (clickOnBackground) {
        popup.close()
    }
})

popup.addEventListener('keydown', (e) => {
    if (e.code === "Esc") {
        popup.close()
    }
})

inputToEnterAge.value = userAnswersLocalStorage.age
userAnswers.name = userAnswersLocalStorage.name
userAnswers.age = userAnswersLocalStorage.age
userAnswers.programmingLanguage = userAnswersLocalStorage.programmingLanguage
userAnswers.finishNumber = userAnswersLocalStorage.finishNumber
userAnswers.projectBuilder = userAnswersLocalStorage.projectBuilder
userAnswers.startNumber = userAnswersLocalStorage.startNumber
inputForRangeFromZero.value = userAnswersLocalStorage.startNumber
inputForRangeTo.value = userAnswersLocalStorage.finishNumber
mainContainerForRadio.value = userAnswersLocalStorage.programmingLanguage
selectOfProjectBuilders.value = userAnswersLocalStorage.projectBuilder
userAnswers.requiredCheckbox = userAnswersLocalStorage.requiredCheckbox
userAnswers.notRequiredCheckbox = userAnswersLocalStorage.notRequiredCheckbox
requiredCheckbox.checked = userAnswersLocalStorage.requiredCheckbox
notRequiredCheckbox.checked = userAnswersLocalStorage.notRequiredCheckbox

/*
submittedListItemProgramBuilder.textContent = "Select " + choosedTypeOfProjectBuilder
submittedListItemProgramLanguages.textContent = "Radio" + choosedTypeOfProgrammingLanguage


submittedListItemAge.textContent = "Возраст " + age
submittedListItemCheckboxes.textContent = "Выбранные checkbox"

 */