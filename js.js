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

let uncheckedUserAnswers = {
  name: "",
  age: "",
  startNumber: "",
  finishNumber: "",
  projectBuilder: "",
  programmingLanguage: "",
  requiredCheckbox: "",
  notRequiredCheckbox: "",
};

let isSubmitButtonActive = "";

let userAnswersLocalStorage = JSON.parse(localStorage.getItem("userAnswers"));
let unCheckedUserAnswersLocalStorage = JSON.parse(
  localStorage.getItem("uncheckedUserAnswers"),
);

let containerForInputOfName = document.getElementsByClassName(
  "containerForInputOfName",
)[0];
let filedsOfForm = Object.keys(userAnswers);

let saveLocalStorageUserAnswers = function (element, value) {
  userAnswers[element] = value;
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
};

let saveLocalStorageUncheckedUserAnswers = function (element, value) {
  uncheckedUserAnswers[element] = value;
  localStorage.setItem(
    "uncheckedUserAnswers",
    JSON.stringify(uncheckedUserAnswers),
  );
};

let updateSubmittedListItemValue = function (
  text,
  type,
  value,
  extraValue,
  extraText,
) {
  if (
    type === submittedListItemCheckboxes &&
    userAnswers.notRequiredCheckbox !== ""
  ) {
    type.textContent = text + value + extraText + extraValue;
    type.value = text + value + extraText + extraValue;
  } else if (type === submittedListItemRange) {
    type.textContent = text + value + extraText + extraValue;
    type.value = text + value + extraText + extraValue;
  } else {
    type.textContent = text + value;
    type.value = text + value;
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

let Javascript = document.getElementsByClassName("Javascript")[1];
let PHP = document.getElementsByClassName("PHP")[1];
let C = document.getElementsByClassName("C#")[1];

let areAllAFieldsFilledIn = function () {
  let areUserAnswersAndUncheckedUserAnswersTheSame = filedsOfForm
    .slice(0, filedsOfForm.length - 1)
    .every((filed) => {
      return userAnswers[filed] === uncheckedUserAnswers[filed];
    });

  let areUserAnswersFilled = filedsOfForm
    .slice(0, filedsOfForm.length - 1)
    .every((filed) => {
      return userAnswers[filed] !== "";
    });
  let areUncheckedUserAnswersFilled = filedsOfForm
    .slice(0, filedsOfForm.length - 1)
    .every((filed) => {
      return uncheckedUserAnswers[filed] !== "";
    });

  if (
    areUserAnswersAndUncheckedUserAnswersTheSame === true &&
    areUserAnswersFilled === true &&
    areUncheckedUserAnswersFilled === true
  ) {
    buttonToSubmitForm.textContent = "Отправить";
    buttonToSubmitForm.disabled = false;
    buttonToSubmitForm.classList.remove("disabled");
    isSubmitButtonActive = false;
    localStorage.setItem("isSubmitButtonActive", isSubmitButtonActive);
  } else {
    buttonToSubmitForm.textContent = "Заполните поля";
    buttonToSubmitForm.disabled = true;
    buttonToSubmitForm.classList.add("disabled");
    isSubmitButtonActive = true;
    localStorage.setItem("isSubmitButtonActive", isSubmitButtonActive);
  }
};
mainContainerForRadio.addEventListener("change", (e) => {
  let valueOfRadio = e.target.value;
  let newMassive = [Javascript, PHP, C].filter(
    (element) => element !== e.target,
  );
  e.target.classList.remove("selectOfProgrammingLanguages");
  e.target.classList.add("choosedTypeOfProgrammingLanguage");
  let labelAgain = e.target.closest(".radio");

  labelAgain.classList.remove("radio");

  newMassive.map((element) => {
    element.classList.remove("choosedTypeOfProgrammingLanguage");
    element.classList.add("selectOfProgrammingLanguages");
    let again = element.closest(".labelForRadio");
    again.classList.add("radio");
  });

  saveLocalStorageUserAnswers("programmingLanguage", valueOfRadio);
  saveLocalStorageUncheckedUserAnswers("programmingLanguage", valueOfRadio);
  areAllAFieldsFilledIn();
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

let inputForName = document.getElementsByClassName("inputForName")[0];

let buttonToSubmitForm = document.getElementsByClassName("button")[0];

let massiveToCheckName = [];
let massiveToCheckNameForLetters = [];

requiredCheckbox.addEventListener("change", () => {
  if (requiredCheckbox.checked) {
    saveLocalStorageUserAnswers("requiredCheckbox", "requiredCheckbox");
    saveLocalStorageUncheckedUserAnswers(
      "requiredCheckbox",
      "requiredCheckbox",
    );
  }

  areAllAFieldsFilledIn();
});

notRequiredCheckbox.addEventListener("change", () => {
  if (notRequiredCheckbox.checked) {
    userAnswers.notRequiredCheckbox = "notRequiredCheckbox";
    notRequiredCheckbox.value = "notRequiredCheckbox";
  } else {
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

    saveLocalStorageUncheckedUserAnswers("name", checkingName);
    areAllAFieldsFilledIn();
  } else if (!doesEveryNameHaveMoreThanTwoLetters) {
    containerForInputOfName.textContent = "ФИО должно быть больше 2 букв";
    saveLocalStorageUncheckedUserAnswers("name", checkingName);
    areAllAFieldsFilledIn();
  } else if (lengthOfName !== 3) {
    containerForInputOfName.textContent = "Введите полное ФИО";

    saveLocalStorageUncheckedUserAnswers("name", checkingName);
    areAllAFieldsFilledIn();
  } else {
    containerForInputOfName.textContent = "Введите ФИО: всё корректно";

    saveLocalStorageUncheckedUserAnswers("name", checkingName);
    saveLocalStorageUserAnswers("name", checkingName);

    areAllAFieldsFilledIn();
  }
});

let containerForAge = document.getElementsByClassName("containerForAge")[0];
inputToEnterAge.addEventListener("input", (e) => {
  let checkingAge = e.target.value;
  let massiveToCheckAgeForNumbers = checkingAge.split("");
  let doesAgeHasOnlyNumbers = massiveToCheckAgeForNumbers.every((element) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(element));
  });

  if (doesAgeHasOnlyNumbers) {
    containerForAge.textContent = "Вводите только цифры";

    saveLocalStorageUncheckedUserAnswers("age", checkingAge);
    areAllAFieldsFilledIn();
  } else if (Number(checkingAge) > 150) {
    containerForAge.textContent = "Введите реальный возраст";

    saveLocalStorageUncheckedUserAnswers("age", checkingAge);
    areAllAFieldsFilledIn();
  } else {
    containerForAge.textContent = "Введите возраст в цифрах";
    saveLocalStorageUserAnswers("age", checkingAge);
    saveLocalStorageUncheckedUserAnswers("age", checkingAge);

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
let errorForFinishNumber =
  "Число не должно быть равно или меньше первого числа";

let containerForInputOfRange = document.getElementsByClassName(
  "containerForInputOfRange",
)[0];
inputForRangeFromZero.addEventListener("input", (e) => {
  let enteredStartNumber = e.target.value;

  let massiveToCheckStartNumber = enteredStartNumber.split("");
  let doesNumberHaveOnlyNumbers = massiveToCheckStartNumber.every((element) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(element));
  });

  if (doesNumberHaveOnlyNumbers) {
    containerForInputOfRange.textContent = "Вводите только цифры";

    saveLocalStorageUncheckedUserAnswers("startNumber", enteredStartNumber);
    areAllAFieldsFilledIn();
  } else if (enteredStartNumber < 0 || enteredStartNumber > 150) {
    containerForInputOfRange.textContent = errorForStartNumber;

    saveLocalStorageUncheckedUserAnswers("startNumber", enteredStartNumber);
    areAllAFieldsFilledIn();
  } else if (
    uncheckedUserAnswers.finishNumber !== "" &&
    enteredStartNumber > uncheckedUserAnswers.finishNumber
  ) {
    containerForInputOfRange.textContent =
      "Число не должно быть больше второго числа";

    saveLocalStorageUncheckedUserAnswers("startNumber", enteredStartNumber);
    areAllAFieldsFilledIn();
  } else {
    containerForInputOfRange.textContent = "Выберите диапазон";

    saveLocalStorageUserAnswers("startNumber", enteredStartNumber);
    saveLocalStorageUncheckedUserAnswers("startNumber", enteredStartNumber);
    areAllAFieldsFilledIn();
  }
});

inputForRangeTo.addEventListener("input", (e) => {
  let enteredFinishNumber = e.target.value;

  let massiveToCheckStartNumber = enteredFinishNumber.split("");
  let doesNumberHaveOnlyNumbers = massiveToCheckStartNumber.every((element) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(element));
  });

  if (doesNumberHaveOnlyNumbers) {
    containerForInputOfRange.textContent = "Вводите только цифры";

    saveLocalStorageUncheckedUserAnswers("finishNumber", enteredFinishNumber);
    areAllAFieldsFilledIn();
  } else if (enteredFinishNumber < 0 || enteredFinishNumber > 150) {
    containerForInputOfRange.textContent = errorForStartNumber;

    saveLocalStorageUncheckedUserAnswers("finishNumber", enteredFinishNumber);
    areAllAFieldsFilledIn();
  } else if (enteredFinishNumber <= uncheckedUserAnswers.startNumber) {
    containerForInputOfRange.textContent = errorForFinishNumber;

    saveLocalStorageUncheckedUserAnswers("finishNumber", enteredFinishNumber);
    areAllAFieldsFilledIn();
  } else {
    containerForInputOfRange.textContent = "Выберите диапазон: всё корректно";

    saveLocalStorageUserAnswers("finishNumber", enteredFinishNumber);
    saveLocalStorageUncheckedUserAnswers("finishNumber", enteredFinishNumber);
    areAllAFieldsFilledIn();
  }
});

selectOfProjectBuilders.addEventListener("change", (e) => {
  saveLocalStorageUserAnswers("projectBuilder", e.target.value);
  saveLocalStorageUncheckedUserAnswers("projectBuilder", e.target.value);
  areAllAFieldsFilledIn();
});

buttonToSubmitForm.addEventListener("click", (e) => {
  e.preventDefault();

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

let isButtonActiveFromLocalStorage = JSON.parse(
  localStorage.getItem("isSubmitButtonActive"),
);
window.addEventListener("load", () => {
  areAllAFieldsFilledIn();

  if (
    unCheckedUserAnswersLocalStorage !== null &&
    unCheckedUserAnswersLocalStorage !== undefined
  ) {
    inputForName.value = unCheckedUserAnswersLocalStorage.name;
    inputToEnterAge.value = unCheckedUserAnswersLocalStorage.age;
    requiredCheckbox.checked =
      unCheckedUserAnswersLocalStorage.requiredCheckbox;
    notRequiredCheckbox.checked =
      unCheckedUserAnswersLocalStorage.notRequiredCheckbox;
    requiredCheckbox.value = unCheckedUserAnswersLocalStorage.requiredCheckbox;
    notRequiredCheckbox.value =
      unCheckedUserAnswersLocalStorage.notRequiredCheckbox;
    inputForRangeFromZero.value = unCheckedUserAnswersLocalStorage.startNumber;
    inputForRangeTo.value = unCheckedUserAnswersLocalStorage.finishNumber;
    mainContainerForRadio.value =
      unCheckedUserAnswersLocalStorage.programmingLanguage;
    selectOfProjectBuilders.value =
      unCheckedUserAnswersLocalStorage.projectBuilder;

    uncheckedUserAnswers.name = unCheckedUserAnswersLocalStorage.name;
    uncheckedUserAnswers.age = unCheckedUserAnswersLocalStorage.age;
    uncheckedUserAnswers.programmingLanguage =
      unCheckedUserAnswersLocalStorage.programmingLanguage;
    uncheckedUserAnswers.finishNumber =
      unCheckedUserAnswersLocalStorage.finishNumber;
    uncheckedUserAnswers.projectBuilder =
      unCheckedUserAnswersLocalStorage.projectBuilder;
    uncheckedUserAnswers.startNumber =
      unCheckedUserAnswersLocalStorage.startNumber;
    uncheckedUserAnswers.requiredCheckbox =
      unCheckedUserAnswersLocalStorage.requiredCheckbox;
    uncheckedUserAnswers.notRequiredCheckbox =
      unCheckedUserAnswersLocalStorage.notRequiredCheckbox;
  }

  if (
    userAnswersLocalStorage !== null &&
    userAnswersLocalStorage !== undefined
  ) {
    userAnswers.name = userAnswersLocalStorage.name;
    userAnswers.age = userAnswersLocalStorage.age;
    userAnswers.programmingLanguage =
      userAnswersLocalStorage.programmingLanguage;
    userAnswers.finishNumber = userAnswersLocalStorage.finishNumber;
    userAnswers.projectBuilder = userAnswersLocalStorage.projectBuilder;
    userAnswers.startNumber = userAnswersLocalStorage.startNumber;
    userAnswers.requiredCheckbox = userAnswersLocalStorage.requiredCheckbox;
    userAnswers.notRequiredCheckbox =
      userAnswersLocalStorage.notRequiredCheckbox;
  }

  if (
    userAnswersLocalStorage !== null &&
    userAnswersLocalStorage !== undefined &&
    userAnswersLocalStorage.programmingLanguage !== null &&
    userAnswersLocalStorage.programmingLanguage !== ""
  ) {
    let elementForRadio = document.getElementsByClassName(
      userAnswersLocalStorage.programmingLanguage,
    )[1];

    elementForRadio.classList.remove("selectOfProgrammingLanguages");
    elementForRadio.classList.add("choosedTypeOfProgrammingLanguage");
    let labelAgain = elementForRadio.closest(".radio");

    labelAgain.classList.remove("radio");
    let newMassive = [Javascript, PHP, C].filter(
      (element) => element !== elementForRadio,
    );
    newMassive.map((element) => {
      element.classList.remove("choosedTypeOfProgrammingLanguage");
      element.classList.add("selectOfProgrammingLanguages");
      let again = element.closest(".labelForRadio");
      again.classList.add("radio");
    });
  }

  if (
    isButtonActiveFromLocalStorage !== null &&
    isButtonActiveFromLocalStorage !== undefined
  ) {
    buttonToSubmitForm.disabled = isButtonActiveFromLocalStorage;
    if (isButtonActiveFromLocalStorage === false) {
      buttonToSubmitForm.classList.remove("disabled");
      buttonToSubmitForm.textContent = "Отправить";
    } else {
      buttonToSubmitForm.classList.add("disabled");
      buttonToSubmitForm.textContent = "Заполните поля";
    }
  }
  console.log(localStorage);
});

let labelForJavascript = document.getElementsByClassName("labelForRadio")[0];
let labelForPHP = document.getElementsByClassName("labelForRadio")[1];
let labelForC = document.getElementsByClassName("labelForRadio")[2];

let form = document.getElementsByClassName("form")[0];

form.addEventListener("reset", function () {
  areAllAFieldsFilledIn();
  window.localStorage.clear();

  Javascript.classList.remove("choosedTypeOfProgrammingLanguage");
  Javascript.classList.add("selectOfProgrammingLanguages");
  labelForJavascript.classList.add("radio");
  PHP.classList.remove("choosedTypeOfProgrammingLanguage");
  PHP.classList.add("selectOfProgrammingLanguages");
  labelForPHP.classList.add("radio");
  C.classList.remove("choosedTypeOfProgrammingLanguage");
  C.classList.add("selectOfProgrammingLanguages");
  labelForC.classList.add("radio");

  console.log(localStorage);

  uncheckedUserAnswers.name = "";
  uncheckedUserAnswers.age = "";
  uncheckedUserAnswers.programmingLanguage = "";
  uncheckedUserAnswers.finishNumber = "";
  uncheckedUserAnswers.projectBuilder = "";
  uncheckedUserAnswers.startNumber = "";
  uncheckedUserAnswers.requiredCheckbox = "";
  uncheckedUserAnswers.notRequiredCheckbox = "";

  userAnswers.name = "";
  userAnswers.age = "";
  userAnswers.programmingLanguage = "";
  userAnswers.finishNumber = "";
  userAnswers.projectBuilder = "";
  userAnswers.startNumber = "";
  userAnswers.requiredCheckbox = "";
  userAnswers.notRequiredCheckbox = "";
  if (
    userAnswersLocalStorage !== null &&
    userAnswersLocalStorage !== undefined &&
    userAnswersLocalStorage.programmingLanguage !== null &&
    userAnswersLocalStorage.programmingLanguage !== ""
  ) {
    let elementForRadio = document.getElementsByClassName(
      userAnswersLocalStorage.programmingLanguage,
    )[1];

    elementForRadio.classList.add("selectOfProgrammingLanguages");
    elementForRadio.classList.remove("choosedTypeOfProgrammingLanguage");
    let labelAgain = elementForRadio.closest(".radio");

    labelAgain.add.remove("radio");
    let newMassive = [Javascript, PHP, C].filter(
      (element) => element !== elementForRadio,
    );
    newMassive.map((element) => {
      element.classList.add("choosedTypeOfProgrammingLanguage");
      element.classList.remove("selectOfProgrammingLanguages");
      let again = element.closest(".labelForRadio");
      again.classList.remove("radio");
    });
  }

  buttonToSubmitForm.textContent = "Заполните поля";
  buttonToSubmitForm.disabled = true;
  buttonToSubmitForm.classList.add("disabled");
});
