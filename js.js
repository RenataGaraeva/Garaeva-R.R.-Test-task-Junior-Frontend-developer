let data = {name: '',
    age: 0,
        startNumber: 0,
    finishNumber: 0,
    projectBuilder: '',
    programmingLanguage: '',
    requiredCheckbox: false,
    notRequiredCheckbox: false
    }
localStorage.getItem('data', JSON.stringify(data))


let name = '';
let choosedTypeOfProjectBuilder = ''
let age = 0;
let choosedTypeOfProgrammingLanguage = '';

let inputForRangeFromZero = document.getElementsByClassName('inputForRangeFromZero')[0]

let inputForRangeTo = document.getElementsByClassName('inputForRangeTo')[0]
let inputForRangeScroll = document.getElementsByClassName('inputForRangeScroll')[0]
let startNumber = 0;
let finishNumber = 0;

let selectOfProjectBuilders =document.getElementsByClassName("selectOfProjectBuilders")[0]
let   selectOfProgrammingLanguages = document.getElementsByClassName("selectOfProgrammingLanguagesJS")[0]
let inputToEnterAge = document.getElementsByClassName("inputToEnterAge")[0]
let requiredCheckbox = document.getElementsByClassName("requiredCheckbox")[0]
let notRequiredCheckbox = document.getElementsByClassName("notRequiredCheckbox")[0]
let buttonToCleanForm = document.getElementsByClassName("buttonToCleanForm")[0]
let inputForName = document.getElementsByClassName("inputForName")[0]
inputForName.value = window.localStorage.getItem('name')
inputToEnterAge.value = window.localStorage.getItem('age')

inputForName.addEventListener('change', (e) => {
    let name = e.target.value;
    inputForName.value = name;
    window.localStorage.setItem('name', name)
})
inputToEnterAge.addEventListener('change', (e) => {
    let age = e.target.value;
    inputToEnterAge.value = age;
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



// let checkingRequirementsForInputForName = function () {

    let buttonToSubmitForm = document.getElementsByClassName("button")[0];
let popup = document.getElementsByClassName("popup")[0];

    buttonToSubmitForm.addEventListener('click', () => {
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


inputForRangeFromZero.addEventListener('change', (e) => {
    let enteredStartNumber = e.target.value
    if (enteredStartNumber <= 150 && enteredStartNumber >= 0) {
        inputForRangeFromZero.classList.remove('notAllowed')
        inputForRangeFromZero.textContent = enteredStartNumber;
      return startNumber = enteredStartNumber
    } else {
        inputForRangeFromZero.classList.add('notAllowed')
    }
})

inputForRangeTo.addEventListener('change', (e) => {
    let enteredFinishNumber = e.target.value

    if (enteredFinishNumber >= startNumber && enteredFinishNumber <= 150 ) {      //вот здесь вопросы
        inputForRangeTo.classList.remove('notAllowed')
        inputForRangeTo.textContent = enteredFinishNumber;
       return  finishNumber = enteredFinishNumber
    } else {
          inputForRangeTo.classList.add('notAllowed')
    }
} )