let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__form');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_job');
let popupOpened = 'popup_opened';

function popupOpen() {
    popup.classList.add(popupOpened);
}
function popupClose() {
    popup.classList.remove(popupOpened);
}

openButton.addEventListener('click',() => {
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
    popupOpen();
});
closeButton.addEventListener('click',() => {
    popupClose();
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    popupClose();
}
formElement.addEventListener('submit', handleFormSubmit);