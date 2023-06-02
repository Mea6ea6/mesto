let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__form');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.field_name');
let jobInput = formElement.querySelector('.field_job');
let popupOpened = 'popup_opened';

openButton.addEventListener('click',() => {
    popup.classList.add(popupOpened);
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
});
closeButton.addEventListener('click',() => {
    popup.classList.remove(popupOpened);
});

function handleFormSubmit (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    popup.classList.remove(popupOpened);
}
formElement.addEventListener('submit', handleFormSubmit);