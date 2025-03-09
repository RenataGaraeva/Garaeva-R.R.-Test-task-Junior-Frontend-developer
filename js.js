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

let containerForInputOfName = document.getElementsByClassName('containerForInputOfName')[0]
    let filedsOfForm = Object.keys(userAnswers)

let updateSubmittedListItemValue = function (text, type, peremennya, peremennyaTwo, extraText) {
    console.log("Нет, сюда" + requiredCheckbox.name)

    if (peremennyaTwo === userAnswers.notRequiredCheckbox && userAnswers.notRequiredCheckbox !== '' ) {
        type.textContent = text + peremennya + extraText + peremennyaTwo
    } else if (peremennyaTwo === 'noValue' && peremennya === userAnswers.requiredCheckbox) {
        type.textContent = text + peremennya
    } else if (peremennya === userAnswers.startNumber) {
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
    console.log("Я здесь" + e.target.value)
    e.target.classList.add('choosedTypeOfProgrammingLanguage')
   /* updateSubmittedListItemValue("Radio: ", submittedListItemProgramLanguages, userAnswers.programmingLanguage) */
    areAllAFieldsFilledIn()
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))

})

let selectOfProjectBuilders = document.getElementsByClassName("selectOfProjectBuilders")[0]
let selectOfProgrammingLanguages = document.getElementsByClassName("selectOfProgrammingLanguagesJS")[0]
let inputToEnterAge = document.getElementsByClassName("inputToEnterAge")[0]
let requiredCheckbox = document.getElementsByClassName("requiredCheckbox")[0]
let notRequiredCheckbox = document.getElementsByClassName("notRequiredCheckbox")[0]
let buttonToCleanForm = document.getElementsByClassName("buttonToCleanForm")[0]
let inputForName = document.getElementsByClassName("inputForName")[0]

let buttonToSubmitForm = document.getElementsByClassName("button")[0];

let massiveToCheckName = [];
let massiveToCheckNameForLetters = [];

let areAllAFieldsFilledIn = function () { //здесь данные надо брать из localStorage, чтобы после перезагрузки введенные данные не терялись
    console.log("Смотри сюда" + userAnswers.name) // а ещё здесь при перезагрузке, если поля визуально почти все заполнены,но не заполнено
        // только одно. И нажимаешь на это одно поле, все равно false выходит. Там что у объекта не сохраняются значения? Только у input value?
    console.log("Сюда" + filedsOfForm.slice(0, filedsOfForm.length - 1))
    let newOne = filedsOfForm.slice(0, filedsOfForm.length - 1).every(filed => {
        console.log(filed)

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
      /*  requiredCheckbox.value = 'Обязательный чекбокс' */
    } else {
        userAnswers.requiredCheckbox = ''
    }

    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    areAllAFieldsFilledIn()
})
notRequiredCheckbox.addEventListener('change', () => {
    if (notRequiredCheckbox.checked) {
        userAnswers.notRequiredCheckbox = 'notRequiredCheckbox'
     notRequiredCheckbox.value = 'notRequiredCheckbox'
    } else {
        userAnswers.notRequiredCheckbox = ''
        notRequiredCheckbox.value = 'noValue'

    }
    localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    areAllAFieldsFilledIn()
})
inputForName.addEventListener('input', (e) => {
//разобраться в условиях

   let checkingName = e.target.value;
console.log(checkingName)
    massiveToCheckNameForLetters = checkingName.split('')
    let doesNameHasOnlyLettersAndSpaces = massiveToCheckNameForLetters.every(element => /[a-zA-Zа-яА-Я\s]/.test(element))
    console.log("Только буквы и пробелы" + doesNameHasOnlyLettersAndSpaces)
    massiveToCheckName = checkingName.split(' ')
    console.log(massiveToCheckName)
    let doesEveryNameHaveMoreThanTwoLetters = massiveToCheckName.every(element => element.length >= 2);

    let lengthOfName = massiveToCheckName.length

    if (!doesNameHasOnlyLettersAndSpaces) {
        inputForName.classList.add('notAllowed')
        containerForInputOfName.textContent = "Введите ФИО: вводите только буквы"
        userAnswers.name = '';
    } else if (!doesEveryNameHaveMoreThanTwoLetters) {
        containerForInputOfName.textContent = "Фамилия, имя и отчество должны быть больше 2 букв"
        userAnswers.name = '';
        } else if (lengthOfName !== 3) {
        containerForInputOfName.textContent = "Введите полное ФИО: фамилию, имя и отчество"
        userAnswers.name = '';
    } else {
        containerForInputOfName.textContent = "Введите ФИО: всё корректно"
        userAnswers.name = e.target.value;
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    }

     /*   inputForName.value = name; это же буквально одно и то же, что и name = e.target.value; вроде пока я проверки не сделала*/
  /*  updateSubmittedListItemValue("ФИО: ", submittedListItemName, name) не нужная штука у инпутов их убрать надо вроде и заменить на функции,
  * сами переменные в формах типа вроде*/


    areAllAFieldsFilledIn()

    console.log( userAnswers.name)
   /* return userAnswers.name */
})
console.log("Вне" + userAnswers.name)
 let userAnswersLocalStorage =  JSON.parse(localStorage.getItem('userAnswers')) // inputForName.value =  JSON.parse(localStorage.getItem('user')) выведенный объект

console.log(userAnswersLocalStorage)
inputForName.value = userAnswersLocalStorage.name

let containerForAge = document.getElementsByClassName('containerForAge')[0]
inputToEnterAge.addEventListener('input', (e) => {

    let checkingAge = e.target.value;
    massiveToCheckAgeForNumbers = checkingAge.split('')
    let doesAgeHasOnlyNumbers =  massiveToCheckAgeForNumbers.every(element => /^\d+$/.test(element))
console.log("ДА"+ doesAgeHasOnlyNumbers)
    if (doesAgeHasOnlyNumbers) {
        containerForAge.textContent = "Введите возраст в цифрах"
        userAnswers.age = e.target.value
        areAllAFieldsFilledIn()
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    } else {
        containerForAge.textContent = "Вводите только цифры"
    }
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
    requiredCheckbox.checked = ''
    mainContainerForRadio.checked = ''
    window.localStorage.clear()
})

let time = new Date()
let showThisYear = time.getFullYear()
console.log(showThisYear)

let infoOfApplicant = document.getElementsByClassName("infoOfApplicant")[0]
infoOfApplicant.textContent = "© Гараева Рената Ринатовна, 1999-" + showThisYear


let popup = document.getElementsByClassName("popup")[0];

let submittedListItemRange = document.getElementsByClassName('submittedListItemRange')[0]


inputForRangeFromZero.addEventListener('input', (e) => {
    let enteredStartNumber = Number(e.target.value)
    if (enteredStartNumber >= 0) {
        userAnswers.finishNumber = Number(userAnswers.startNumber + 1);
        inputForRangeTo.value = userAnswers.finishNumber
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
    }
/*
    if (enteredStartNumber <= 150 && enteredStartNumber >= 0) {
        inputForRangeFromZero.classList.remove('notAllowed')
        inputForRangeFromZero.textContent = enteredStartNumber;
        userAnswers.startNumber = enteredStartNumber

        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))

    } else {
        containerForInputOfRange.textContent =
        localStorage.setItem('userAnswers', JSON.stringify(userAnswers))
        inputForRangeFromZero.classList.add('notAllowed')
    }
    areAllAFieldsFilledIn()

 */
})

inputForRangeTo.addEventListener('input', (e) => {
    let enteredFinishNumber = Number(e.target.value)
if (Number(userAnswers.startNumber) >= 0) {
    userAnswers.finishNumber = Number(userAnswers.startNumber) + 1;
    inputForRangeTo.value = userAnswers.finishNumber
}
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
    updateSubmittedListItemValue("Выбранные checkbox: ", submittedListItemCheckboxes, userAnswers.requiredCheckbox,userAnswers.notRequiredCheckbox,", ")
    updateSubmittedListItemValue("Возраст: ", submittedListItemAge, userAnswers.age)
    updateSubmittedListItemValue("Radio: ", submittedListItemProgramLanguages, userAnswers.programmingLanguage)
    updateSubmittedListItemValue("Диапазон: от ", submittedListItemRange, userAnswers.startNumber, userAnswers.finishNumber, " до ")
    updateSubmittedListItemValue("Select: ",  submittedListItemProgramBuilder, userAnswers.projectBuilder)

    popup.showModal()

})
let closeBottonForPopup = document.getElementsByClassName("closeBottonForPopup")[0];

closeBottonForPopup.addEventListener('click', () => {
    popup.close()
})

let closeOnBackDropClick = function ({currentTarget, target}) {
    popup = currentTarget
    let isClickedOnBackground = target === popup

    if (isClickedOnBackground) {
       popup.close()
    }
}
popup.addEventListener('click', closeOnBackDropClick)
/*
popup.addEventListener('click', ({areaOfPopup, notAreaOfPopup}) => {
    let popupArea = areaOfPopup
    let clickOnBackground = notAreaOfPopup === popupArea
    if (clickOnBackground) {
        popup.close()
    }
})


 */
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
requiredCheckbox.value = userAnswersLocalStorage.requiredCheckbox
notRequiredCheckbox.value = userAnswersLocalStorage.notRequiredCheckbox

/*
document.addEventListener('DOMContentLoaded', () => {
    let getValueOfProgrammingLanguageFromLocalStorage = function () {
        let value = userAnswersLocalStorage.programmingLanguage
console.log("Здесь"+ value)
        let newValue = document.getElementsByClassName('value')
        console.log("Пробую" + newValue)
        newValue.value = value
        console.log("И здесь Пробую" +  newValue.value )
        console.log("Локад И здесь Пробую" +  newValue.checked )
      userAnswers.programmingLanguage = newValue.value

    }
    getValueOfProgrammingLanguageFromLocalStorage()
});

 */
