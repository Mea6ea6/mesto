// imports ↓

import './index.css'

import { 
  apiConfig,
  validationConfig,
  formRedactElement,
  formAvatarElement,
  formAddElement,
  openButtonAvatar,
  openButtonRedact,
  openButtonAdd,
  nameInput,
  infoInput,
  avatarOutput,
  nameOutput,
  infoOutput
} from '../scripts/utils/constants.js';

import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithConfirmation } from '../scripts/components/PopupWithConfirmation.js';
import { Api } from '../scripts/components/Api.js';



// constants ↓

let userId = null;

const api = new Api(apiConfig);

const userInfo = new UserInfo({
  profileSelector: '.profile__name',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const cardSection = new Section({
  renderer: (data) => {
    const card = createCard(data);
    cardSection.appendItem(card);
  }
}, '.elements');

const popupWithImage = new PopupWithImage('#popup-card');

const popupWithConfirmation = new PopupWithConfirmation('#popup-confirm', null);

const popupFormAdd = new PopupWithForm('#popup-add', {
  submitHandler: (data) => {
    popupFormAdd.renderLoading(true);
    api.addNewCard(data)
      .then((res) => {
        const card = createCard(res)
        cardSection.prependItem(card)
        popupFormAdd.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupFormAdd.renderLoading(false)
      })
  }
});

const popupFormEdit = new PopupWithForm('#popup-redact', {
  submitHandler: (data) => {
    popupFormEdit.renderLoading(true);
    api.editProfile(data)
      .then((res) => {
        userInfo.setUserData({
          profile: res.name,
          info: res.about,
          avatar: res.avatar ? res.avatar : avatarOutput.src,
          _id: res._id
        })
        popupFormEdit.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupFormEdit.renderLoading(false)
      });
  }
});

const popupFormAvatar = new PopupWithForm('#popup-avatar', {
  submitHandler: (data) => {
    popupFormAvatar.renderLoading(true);
    api.editProfileAvatar(data)
      .then((res) => {
        userInfo.setUserData({
          profile: res.name ? res.name : nameOutput.textContent,
          info: res.about ? res.about : infoOutput.textContent,
          avatar: res.avatar,
          _id: res._id
        })
        popupFormAvatar.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupFormAvatar.renderLoading(false)
      })
  }
});

const validationAvatar = new FormValidator(validationConfig, formAvatarElement);

const validationProfile = new FormValidator(validationConfig, formRedactElement);

const validationCard = new FormValidator(validationConfig, formAddElement);



// api ↓

api.getAllInfo()
  .then(([userData, cardAll]) => {
    userInfo.setUserData({profile: userData.name, info: userData.about, avatar: userData.avatar})
    userId = userData._id
    cardSection.renderItems(cardAll)
});



// functions ↓

function createCard(data) {
  const newCard = new Card(data, userId, '#card-template', handleCardClick, handleCardLike, handleCardDelete);
  return newCard.createCard();
}

function handleCardClick(imgLink, caption){
  popupWithImage.open(imgLink, caption);
};

function handleCardLike(data){
  api.changeCardLike(data.getId(), data.isLiked())
    .then((res) => {
      data.setLikesData(res)
    })
    .catch(err => console.log(err))
};

function handleCardDelete(card){
  popupWithConfirmation.open();
  popupWithConfirmation.setSubmitCallback(() => {
    popupWithConfirmation.renderLoading(true);
    api.deleteCard(card.getId())
      .then(() => {
        card.removeCard()
        popupWithConfirmation.close()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupWithConfirmation.renderLoading(false)
      });
  })
};

function handleOpenEditProfilePopup() {
  popupFormEdit.open();
  const userData = userInfo.getUserData();
  nameInput.value = userData.profile;
  infoInput.value = userData.info;
  validationProfile.clearFormErrors();
};

function handleOpenEditAvatarPopup() {
  popupFormAvatar.open();
  validationAvatar.clearFormErrors();
  validationAvatar.disableButton();
};

function handleOpenAddCardPopup() {
  popupFormAdd.open();
  validationCard.clearFormErrors();
  validationCard.disableButton();
};



// other ↓

validationAvatar.enableValidation();
validationProfile.enableValidation();
validationCard.enableValidation();

popupWithImage.setEventListeners();
popupWithConfirmation.setEventListeners();
popupFormAdd.setEventListeners();
popupFormEdit.setEventListeners();
popupFormAvatar.setEventListeners();

openButtonRedact.addEventListener('click', handleOpenEditProfilePopup);
openButtonAvatar.addEventListener('click', handleOpenEditAvatarPopup);
openButtonAdd.addEventListener('click', handleOpenAddCardPopup);