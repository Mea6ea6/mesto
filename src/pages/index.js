import './index.css'

import { 
  config,
  formRedactElement,
  formAvatarElement,
  formAddElement,
  openButtonAvatar,
  openButtonRedact,
  openButtonAdd,
  nameInput,
  infoInput,
  configApi
} from '../scripts/utils/constants.js';

import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithCardDeleter } from '../scripts/components/PopupWithCardDel.js';

import { Api } from '../scripts/components/Api.js';
const api = new Api(configApi);
let userId = null;
api.getAllInfo()
  .then(([userData, cardAll]) => {
    userInfo.setUserData({profile: userData.name, info: userData.about, avatar: userData.avatar})
    userId = userData._id
    cardSection.renderItems(cardAll)
});



const userInfo = new UserInfo({
  profileSelector: '.profile__name',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});



const cardSection = new Section(createCard, '.elements');

function createCard(data) {
  const newCard = new Card(data, userId, '#card-template', handleCardClick, handleCardLike, handleCardDelete).createCard();
  cardSection.addCard(newCard);
}



const popupWithImage = new PopupWithImage('#popup-card');
popupWithImage.setEventListeners();

const popupConfirmDel = new PopupWithCardDeleter('#popup-confirm', null);
popupConfirmDel.setEventListeners();

const popupFormAdd = new PopupWithForm('#popup-add', {
  submitHandler: (data) => {
    popupFormAdd.renderLoading(true);
    api.addNewCard(data)
    .then((res) => {
      createCard(res)
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupFormAdd.renderLoading(false)
    })
  }
});
popupFormAdd.setEventListeners();

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
    })
    .catch(err => console.log(err))
    .finally(() => {
      popupFormEdit.renderLoading(false)
    });
  }
});
popupFormEdit.setEventListeners();

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
        });
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupFormAvatar.renderLoading(false)
      })
  }
});
popupFormAvatar.setEventListeners();



function handleCardClick(imgLink, caption){
  popupWithImage.open(imgLink, caption);
};

function handleCardLike(data){
  api.changeCardLike(data.getId(), data.checkLikeStatus())
    .then((res) => {
      data.setLikesData(res)
    })
    .catch(err => console.log(err))
};

function handleCardDelete(data){
  popupConfirmDel.open();
  popupConfirmDel.setDeleteCard(() => {
    popupConfirmDel.renderLoading(true);
    api.deleteCard(data.getId())
      .then(() => {
        data.remove()
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupConfirmDel.renderLoading(false)
      });
  })
};

function handlePopupRedact() {
  popupFormEdit.open();
  const userData = userInfo.getUserData();
  nameInput.value = userData.profile;
  infoInput.value = userData.info;
  validationProfile.clearFormErrors();
};
openButtonRedact.addEventListener('click', handlePopupRedact);

function handleAvatarForm() {
  popupFormAvatar.open();
  validationAvatar.clearFormErrors();
  validationAvatar.disableButton();
};
openButtonAvatar.addEventListener('click', handleAvatarForm);

function handlePopupAdd() {
  popupFormAdd.open();
  validationCard.clearFormErrors();
  validationCard.disableButton();
};
openButtonAdd.addEventListener('click', handlePopupAdd);



const validationAvatar = new FormValidator(config, formAvatarElement);
validationAvatar.enableValidation();

const validationProfile = new FormValidator(config, formRedactElement);
validationProfile.enableValidation();

const validationCard = new FormValidator(config, formAddElement);
validationCard.enableValidation();