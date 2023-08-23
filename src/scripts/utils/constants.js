export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
};

export const popupRedact = document.querySelector('.popup_redact');
export const popupAdd = document.querySelector('.popup_add');
export const formRedactElement = popupRedact.querySelector('.popup__form');
export const formAddElement = popupAdd.querySelector('.popup__form');
export const openButtonRedact = document.querySelector('.profile__edit-button');
export const openButtonAdd = document.querySelector('.profile__add-button');
export const nameInput = formRedactElement.querySelector(".popup__input_type_name");
export const infoInput = formRedactElement.querySelector(".popup__input_type_info");
export const elementList = document.querySelector('.elements');