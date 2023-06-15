const openButtonRedact = document.querySelector('.profile__edit-button');
const openButtonAdd = document.querySelector('.profile__add-button');

const popupRedact = document.querySelector('.popup_redact');
const popupAdd = document.querySelector('.popup_add');
const closeButtonRedact = popupRedact.querySelector('.popup__close-button');
const closeButtonAdd = popupAdd.querySelector('.popup__close-button');

let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__description');

const formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_job');

let namedInput = formElement.querySelector('.popup__field_type_named');
let linkInput = formElement.querySelector('.popup__field_type_link');

const popupOpened = 'popup_opened';
function buttonOpen(popup) {
    popup.classList.add(popupOpened);
}
function buttonClose(popup) {
    popup.classList.remove(popupOpened);
}


// Поп-ап редактирования
openButtonRedact.addEventListener('click',() => {
    buttonOpen(popupRedact);
    nameInput.value = nameOutput.textContent;
    jobInput.value = jobOutput.textContent;
});
closeButtonRedact.addEventListener('click',() => {
    buttonClose (popupRedact);
});

// Поп-ап добавления
openButtonAdd.addEventListener('click',() => {
    buttonOpen(popupAdd);
});
closeButtonAdd.addEventListener('click',() => {
     buttonClose (popupAdd)
});


// Редактирование профиля
function handleFormSubmit (evt) {
    evt.preventDefault();
    nameOutput.textContent = nameInput.value;
    jobOutput.textContent = jobInput.value;
    buttonClose(popupRedact);
}
formElement.addEventListener('submit', handleFormSubmit);