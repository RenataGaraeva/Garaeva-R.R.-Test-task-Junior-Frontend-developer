let userAnswers = {
  name: "",
  age: "",
  startNumber: "",
  finishNumber: "",
  projectBuilder: "",
  programmingLanguage: "",
  requiredCheckbox: "",
  notRequiredCheckbox: "",
};

let containerForInputOfName = document.getElementsByClassName(
  "containerForInputOfName",
)[0];
let filedsOfForm = Object.keys(userAnswers);

let updateSubmittedListItemValue = function (
  text,
  type,
  peremennya,
  peremennyaTwo,
  extraText,
) {
  if (
    peremennyaTwo === userAnswers.notRequiredCheckbox &&
    userAnswers.notRequiredCheckbox !== ""
  ) {
    type.textContent = text + peremennya + extraText + peremennyaTwo;
  } else if (
    peremennyaTwo === "noValue" &&
    peremennya === userAnswers.requiredCheckbox
  ) {
    type.textContent = text + peremennya;
  } else if (peremennya === userAnswers.startNumber) {
    type.textContent = text + peremennya + extraText + peremennyaTwo;
    type.value = text + peremennya + extraText + peremennyaTwo; //убрать можно такие штуки
  } else if (peremennyaTwo === undefined) {
    type.textContent = text + peremennya;
    type.value = text + peremennya;
  } else {
    type.textContent = text + peremennya + peremennyaTwo;
    type.value = text + peremennya + peremennyaTwo;
  }
};

let submittedListItemProgramBuilder = document.getElementsByClassName(
  "submittedListItemProgramBuilder",
)[0];
let submittedListItemProgramLanguages = document.getElementsByClassName(
  "submittedListItemProgramLanguages",
)[0];

let submittedListItemAge = document.getElementsByClassName(
  "submittedListItemAge",
)[0];
let submittedListItemCheckboxes = document.getElementsByClassName(
  "submittedListItemCheckboxes",
)[0];

let submittedListItemName = document.getElementsByClassName(
  "submittedListItemName",
)[0];

let inputForRangeFromZero = document.getElementsByClassName(
  "inputForRangeFromZero",
)[0];

let inputForRangeTo = document.getElementsByClassName("inputForRangeTo")[0];
let mainContainerForRadio = document.getElementsByClassName(
  "mainContainerForRadio",
)[0];

mainContainerForRadio.addEventListener("change", (e) => {
  userAnswers.programmingLanguage = e.target.value;

  e.target.classList.add("choosedTypeOfProgrammingLanguage");

  areAllAFieldsFilledIn();
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
});

let selectOfProjectBuilders = document.getElementsByClassName(
  "selectOfProjectBuilders",
)[0];
let selectOfProgrammingLanguages = document.getElementsByClassName(
  "selectOfProgrammingLanguagesJS",
)[0];
let inputToEnterAge = document.getElementsByClassName("inputToEnterAge")[0];
let requiredCheckbox = document.getElementsByClassName("requiredCheckbox")[0];
let notRequiredCheckbox = document.getElementsByClassName(
  "notRequiredCheckbox",
)[0];

export let inputForName = document.getElementsByClassName("inputForName")[0];

let buttonToSubmitForm = document.getElementsByClassName("button")[0];

let massiveToCheckName = [];
let massiveToCheckNameForLetters = [];

let areAllAFieldsFilledIn = function () {
  let newOne = filedsOfForm.slice(0, filedsOfForm.length - 1).every((filed) => {
    return userAnswers[filed] !== "";
  });
  if (!newOne) {
    buttonToSubmitForm.textContent = "Заполните все поля";
    buttonToSubmitForm.disabled = true;
    buttonToSubmitForm.classList.add("disabled");
  } else {
    buttonToSubmitForm.textContent = "Отправить";

    buttonToSubmitForm.disabled = false;
    buttonToSubmitForm.classList.remove("disabled");
  }
};

areAllAFieldsFilledIn();

requiredCheckbox.addEventListener("change", () => {
  if (requiredCheckbox.checked) {
    console.log("Обязательный чек-бокс выбран" + requiredCheckbox.checked);
    userAnswers.requiredCheckbox = "requiredCheckbox";
  } else {
    console.log("Обязательный чек-бокс не выбран" + requiredCheckbox.checked);
    userAnswers.requiredCheckbox = "";
  }

  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  areAllAFieldsFilledIn();
});

notRequiredCheckbox.addEventListener("change", () => {
  if (notRequiredCheckbox.checked) {
    console.log("Не обязательный чекбокс выбран" + notRequiredCheckbox.checked);
    userAnswers.notRequiredCheckbox = "notRequiredCheckbox";
    notRequiredCheckbox.value = "notRequiredCheckbox";
  } else {
    console.log(
      "Не обязательный чекбокс не выбран" + notRequiredCheckbox.checked,
    );
    userAnswers.notRequiredCheckbox = "";
    notRequiredCheckbox.value = "noValue";
  }
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
});
inputForName.addEventListener("input", (e) => {
  let checkingName = e.target.value;

  massiveToCheckNameForLetters = checkingName.split("");
  let doesNameHasOnlyLettersAndSpaces = massiveToCheckNameForLetters.every(
    (element) => /[a-zA-Zа-яА-Я\s]/.test(element),
  );

  massiveToCheckName = checkingName.split(" ");

  let doesEveryNameHaveMoreThanTwoLetters = massiveToCheckName.every(
    (element) => element.length >= 2,
  );

  let lengthOfName = massiveToCheckName.length;

  if (!doesNameHasOnlyLettersAndSpaces) {
    inputForName.classList.add("notAllowed");
    containerForInputOfName.textContent = "Введите ФИО: вводите только буквы";
    userAnswers.name = "";
  } else if (!doesEveryNameHaveMoreThanTwoLetters) {
    containerForInputOfName.textContent =
      "Фамилия, имя и отчество должны быть больше 2 букв";
    userAnswers.name = "";
  } else if (lengthOfName !== 3) {
    containerForInputOfName.textContent =
      "Введите полное ФИО: фамилию, имя и отчество";
    userAnswers.name = "";
  } else {
    containerForInputOfName.textContent = "Введите ФИО: всё корректно";
    userAnswers.name = e.target.value;
    console.log("Имя: всё корректно" + userAnswers.name);

    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    areAllAFieldsFilledIn();
  }
});

let userAnswersLocalStorage = JSON.parse(localStorage.getItem("userAnswers")); // inputForName.value =  JSON.parse(localStorage.getItem('user')) выведенный объект

let containerForAge = document.getElementsByClassName("containerForAge")[0];
inputToEnterAge.addEventListener("input", (e) => {
  let checkingAge = e.target.value;
  let massiveToCheckAgeForNumbers = checkingAge.split("");
  let doesAgeHasOnlyNumbers = massiveToCheckAgeForNumbers.every((element) =>
    /^\d+$/.test(element),
  );

  if (!doesAgeHasOnlyNumbers) {
    containerForAge.textContent = "Вводите только цифры";
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  } else {
    containerForAge.textContent = "Введите возраст в цифрах";
    userAnswers.age = e.target.value;
    console.log("Возраст указан корректно" + userAnswers.age);
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    areAllAFieldsFilledIn();
  }
});

let time = new Date();
let showThisYear = time.getFullYear();

let infoOfApplicant = document.getElementsByClassName("infoOfApplicant")[0];
infoOfApplicant.textContent =
  "© Гараева Рената Ринатовна, 1999-" + showThisYear;

let popup = document.getElementsByClassName("popup")[0];

let submittedListItemRange = document.getElementsByClassName(
  "submittedListItemRange",
)[0];

let errorForStartNumber = "Число должно быть от 0 до 150";
let errorForFinishNumber = "Число должно быть не меньше первого числа";

let containerForInputOfRange = document.getElementsByClassName(
  "containerForInputOfRange",
)[0];
inputForRangeFromZero.addEventListener("input", (e) => {
  let enteredStartNumber = Number(e.target.value);

  if (enteredStartNumber < 0 || enteredStartNumber > 150) {
    containerForInputOfRange.textContent = errorForStartNumber;
  } else if (enteredStartNumber > userAnswers.finishNumber) {
    containerForInputOfRange.textContent =
      "Число не должно быть больше второго числа";
  } else {
    containerForInputOfRange.textContent = "Выберите диапазон";
    userAnswers.startNumber = enteredStartNumber;
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    areAllAFieldsFilledIn();
  }
});

inputForRangeTo.addEventListener("input", (e) => {
  let enteredFinishNumber = Number(e.target.value);
  if (enteredFinishNumber < 0 || enteredFinishNumber > 150) {
    containerForInputOfRange.textContent = errorForStartNumber;
  } else if (enteredFinishNumber < userAnswers.startNumber) {
    containerForInputOfRange.textContent = errorForFinishNumber;
  } else {
    containerForInputOfRange.textContent = "Выберите диапазон: всё корректно";
    userAnswers.finishNumber = enteredFinishNumber;
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    areAllAFieldsFilledIn();
  }
});

selectOfProjectBuilders.addEventListener("change", (e) => {
  userAnswers.projectBuilder = e.target.value;
  areAllAFieldsFilledIn();
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  areAllAFieldsFilledIn();
});

buttonToSubmitForm.addEventListener("click", () => {
  updateSubmittedListItemValue(
    "ФИО: ",
    submittedListItemName,
    userAnswers.name,
  );
  updateSubmittedListItemValue(
    "Выбранные checkbox: ",
    submittedListItemCheckboxes,
    userAnswers.requiredCheckbox,
    userAnswers.notRequiredCheckbox,
    ", ",
  );
  updateSubmittedListItemValue(
    "Возраст: ",
    submittedListItemAge,
    userAnswers.age,
  );
  updateSubmittedListItemValue(
    "Radio: ",
    submittedListItemProgramLanguages,
    userAnswers.programmingLanguage,
  );
  updateSubmittedListItemValue(
    "Диапазон: от ",
    submittedListItemRange,
    userAnswers.startNumber,
    userAnswers.finishNumber,
    " до ",
  );
  updateSubmittedListItemValue(
    "Select: ",
    submittedListItemProgramBuilder,
    userAnswers.projectBuilder,
  );

  popup.showModal();
});
let closeBottonForPopup = document.getElementsByClassName(
  "closeBottonForPopup",
)[0];

closeBottonForPopup.addEventListener("click", () => {
  popup.close();
});

let closeOnBackDropClick = function ({ currentTarget, target }) {
  popup = currentTarget;
  let isClickedOnBackground = target === popup;

  if (isClickedOnBackground) {
    popup.close();
  }
};
popup.addEventListener("click", closeOnBackDropClick);

popup.addEventListener("keydown", (e) => {
  if (e.code === "Esc") {
    popup.close();
  }
});
inputForName.value = userAnswersLocalStorage.name;
let buttonToCleanForm = document.getElementsByClassName("buttonToCleanForm")[0];

inputToEnterAge.value = userAnswersLocalStorage.age;
userAnswers.name = userAnswersLocalStorage.name;
userAnswers.age = userAnswersLocalStorage.age;
userAnswers.programmingLanguage = userAnswersLocalStorage.programmingLanguage;
userAnswers.finishNumber = userAnswersLocalStorage.finishNumber;
userAnswers.projectBuilder = userAnswersLocalStorage.projectBuilder;
userAnswers.startNumber = userAnswersLocalStorage.startNumber;
inputForRangeFromZero.value = userAnswersLocalStorage.startNumber;
inputForRangeTo.value = userAnswersLocalStorage.finishNumber;
mainContainerForRadio.value = userAnswersLocalStorage.programmingLanguage;
selectOfProjectBuilders.value = userAnswersLocalStorage.projectBuilder;
userAnswers.requiredCheckbox = userAnswersLocalStorage.requiredCheckbox;
userAnswers.notRequiredCheckbox = userAnswersLocalStorage.notRequiredCheckbox;
requiredCheckbox.checked = userAnswersLocalStorage.requiredCheckbox;
notRequiredCheckbox.checked = userAnswersLocalStorage.notRequiredCheckbox;
requiredCheckbox.value = userAnswersLocalStorage.requiredCheckbox;
notRequiredCheckbox.value = userAnswersLocalStorage.notRequiredCheckbox;
buttonToCleanForm.addEventListener("click", () => {
  selectOfProjectBuilders.value = "";
  selectOfProgrammingLanguages.value = "";
  requiredCheckbox.value = "";
  notRequiredCheckbox.value = "";
  inputToEnterAge.value = "";
  inputForName.value = "";
  inputForRangeFromZero.value = "";
  inputForRangeTo.value = "";
  requiredCheckbox.checked = "";
  mainContainerForRadio.checked = "";

  window.localStorage.clear();
});
