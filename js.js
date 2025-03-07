let data = {name: '',
    age: 0,
        startNumber: 0,
    finishNumber: 0,
    projectBuilder: '',
    programmingLanguage: '',
    requiredCheckbox: false,
    notRequiredCheckbox: false
    }

let name = '';
let startNumber = 0;
let finishNumber = 0;

let updateSubmittedListItemValue = function (text, type, peremennya) {
    type.textContent = text + peremennya
    type.value = text + peremennya
}

let submittedListItemProgramBuilder = document.getElementsByClassName('submittedListItemProgramBuilder')[0]
let submittedListItemProgramLanguages  = document.getElementsByClassName('submittedListItemProgramLanguages')[0]

let submittedListItemAge  = document.getElementsByClassName('submittedListItemAge')[0]
let submittedListItemCheckboxes  = document.getElementsByClassName('submittedListItemCheckboxes')[0]


let submittedListItemName  = document.getElementsByClassName('submittedListItemName')[0]


let choosedTypeOfProjectBuilder = ''
let age = 0;
let choosedTypeOfProgrammingLanguage = '';

let inputForRangeFromZero = document.getElementsByClassName('inputForRangeFromZero')[0]

let inputForRangeTo = document.getElementsByClassName('inputForRangeTo')[0]
let inputForRangeScroll = document.getElementsByClassName('inputForRangeScroll')[0]
let mainContainerForRadio = document.getElementsByClassName('mainContainerForRadio')[0]
mainContainerForRadio.addEventListener('change', (e) => {
    choosedTypeOfProgrammingLanguage = e.target.value
    e.target.classList.add('choosedTypeOfProgrammingLanguage')
    updateSubmittedListItemValue("Radio: ", submittedListItemProgramLanguages, choosedTypeOfProgrammingLanguage)
    localStorage.setItem('choosedTypeOfProgrammingLanguage', choosedTypeOfProgrammingLanguage) //localstorage надо сделать
    console.log( choosedTypeOfProgrammingLanguage )
})

let selectOfProjectBuilders = document.getElementsByClassName("selectOfProjectBuilders")[0]
let   selectOfProgrammingLanguages = document.getElementsByClassName("selectOfProgrammingLanguagesJS")[0]
let inputToEnterAge = document.getElementsByClassName("inputToEnterAge")[0]
let requiredCheckbox = document.getElementsByClassName("requiredCheckbox")[0]
let notRequiredCheckbox = document.getElementsByClassName("notRequiredCheckbox")[0]
let buttonToCleanForm = document.getElementsByClassName("buttonToCleanForm")[0]
let inputForName = document.getElementsByClassName("inputForName")[0]
inputForName.value = window.localStorage.getItem('name')
inputToEnterAge.value = window.localStorage.getItem('age')
inputForRangeFromZero.value = window.localStorage.getItem('startNumber')
inputForRangeTo.value = window.localStorage.getItem('finishNumber')
mainContainerForRadio.value = window.localStorage.getItem('choosedTypeOfProgrammingLanguage')
selectOfProjectBuilders.value = window.localStorage.getItem('projectBuilder')

inputForName.addEventListener('input', (e) => {
    name = e.target.value;
    inputForName.value = name;
  /*  updateSubmittedListItemValue("ФИО: ", submittedListItemName, name) не нужная штука у инпутов их убрать надо вроде и заменить на функции,
  * сами переменные в формах типа вроде*/
    localStorage.setItem('name', name)
    return name
})
inputToEnterAge.addEventListener('input', (e) => {
   age = e.target.value;
    inputToEnterAge.value = age;
    updateSubmittedListItemValue("Возраст: ", submittedListItemAge, age)
    window.localStorage.setItem('age', age)
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

    let buttonToSubmitForm = document.getElementsByClassName("button")[0];
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
      startNumber = enteredStartNumber
        updateSubmittedListItemRangeValue()

        localStorage.setItem('startNumber', startNumber)

    } else {
        inputForRangeFromZero.classList.add('notAllowed')
    }
})

inputForRangeTo.addEventListener('input', (e) => {
    let enteredFinishNumber = Number(e.target.value)

    if (enteredFinishNumber >= startNumber && enteredFinishNumber <= 150 ) {      //вот здесь вопросы
        inputForRangeTo.classList.remove('notAllowed')
        inputForRangeTo.textContent = enteredFinishNumber;
       finishNumber = enteredFinishNumber

        window.localStorage.setItem('finishNumber', finishNumber)
    } else {
          inputForRangeTo.classList.add('notAllowed')
    }
} )
selectOfProjectBuilders.addEventListener('change', (e) => {
    choosedTypeOfProjectBuilder = e.target.value
    window.localStorage.setItem('projectBuilder', choosedTypeOfProjectBuilder)

})

buttonToSubmitForm.addEventListener('click', () => {
    updateSubmittedListItemValue("ФИО: ", submittedListItemName, inputForName.value)
    updateSubmittedListItemValue("Возраст: ", submittedListItemAge, inputToEnterAge.value)
    updateSubmittedListItemValue("Radio: ", submittedListItemProgramLanguages, mainContainerForRadio.value)
    updateSubmittedListItemRangeValue(inputForRangeFromZero.value, inputForRangeTo.value)
    updateSubmittedListItemValue("Select: ",  submittedListItemProgramBuilder, selectOfProjectBuilders.value)
    console.log(name)
    popup.showModal()

    //   popup.setAttribute("open")   //лучше атрибут установить open для тега dialogue popup.classList.remove("hidden")
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

/*
submittedListItemProgramBuilder.textContent = "Select " + choosedTypeOfProjectBuilder
submittedListItemProgramLanguages.textContent = "Radio" + choosedTypeOfProgrammingLanguage


submittedListItemAge.textContent = "Возраст " + age
submittedListItemCheckboxes.textContent = "Выбранные checkbox"

 */