export const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-73',
    headers: {
        authorization: '06d23768-be94-43bd-8bc4-98ba10f0190d',
        'Content-Type': 'application/json'
    }
}

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
};

export const popupRedact = document.querySelector('.popup_redact');
export const popupAvatar = document.querySelector('.popup_avatar');
export const popupAdd = document.querySelector('.popup_add');
export const formRedactElement = popupRedact.querySelector('.popup__form');
export const formAvatarElement = popupAvatar.querySelector('.popup__form');
export const formAddElement = popupAdd.querySelector('.popup__form');
export const openButtonAvatar = document.querySelector('.profile__overlay');
export const openButtonRedact = document.querySelector('.profile__edit-button');
export const openButtonAdd = document.querySelector('.profile__add-button');
export const avatarOutput = document.querySelector('.profile__avatar');
export const nameOutput = document.querySelector('.profile__name');
export const infoOutput = document.querySelector('.profile__description');
export const nameInput = formRedactElement.querySelector('.popup__input_type_name');
export const infoInput = formRedactElement.querySelector('.popup__input_type_info');