let time = new Date()
let showThisYear = time.getFullYear()
console.log(showThisYear)

/*
let footer = document.createElement("footer")
let borderline = document.createElement("div")

 */

let infoOfApplicant = document.getElementsByClassName("infoOfApplicant")[0]
infoOfApplicant.textContent = "© Гараева Рената Ринатовна, 1999-" + showThisYear


let inputForName = document.getElementsByClassName("inputForName")[0];
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
    let clickOnBackgound = notAreaOfPopup === popupArea
    if (clickOnBackgound) {
        popup.close()
    }
})

popup.addEventListener('keydown', (e) => {
        if (e.code === "Esc") {
        popup.close()
    }
})
/*
footer.append(borderline)
footer.append(infoOfApplicant)
mainBody.append(footer)

 */
