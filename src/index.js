import { 
  config,
  formRedactElement,
  formAddElement,
  openButtonRedact,
  openButtonAdd,
  nameInput,
  infoInput,
  elementList,
} from './scripts/utils/constants.js';
import { initialCards } from './scripts/utils/cards.js';
import { Card } from './scripts/components/Card.js';
import { FormValidator } from './scripts/components/FormValidator.js';
import { UserInfo } from './scripts/components/UserInfo.js';
import { Section } from './scripts/components/Section.js';
import { PopupWithForm } from './scripts/components/PopupWithForm.js';
import { PopupWithImage } from './scripts/components/PopupWithImage.js';



const userInfo = new UserInfo({
  name: document.querySelector('.profile__name'),
  info: document.querySelector('.profile__description')
});
userInfo.setUserData({name: 'Игорь Малик', info: 'Профессиональный прожигатель времени'});
userInfo.renewUserData();



function renderCard(data) {
  const newCard = new Card(data.name, data.link, '#card-template', handleCardClick);
  return newCard.createCard();
}
const cardSection = new Section({
  items: initialCards,
  renderer: renderCard,
}, elementList);
cardSection.renderItem();



const popupWithImage = new PopupWithImage('#popup-card');
popupWithImage.setEventListeners();
function handleCardClick(imgLink, caption){
  popupWithImage.open(imgLink, caption);
}

const popupFormEdit = new PopupWithForm('#popup-redact', {
  submitHandler: (data) =>{
    userInfo.setUserData({
      name: data.name,
      info: data.info
    });
    popupFormEdit.close();
  }
});
popupFormEdit.setEventListeners();

const popupFormAdd = new PopupWithForm('#popup-add', {
  selectorForm: '.popup__form',
  submitHandler: (data) => {
    const newCard = renderCard(data);
    cardSection.addItem(newCard);
  }
})
popupFormAdd.setEventListeners();



function handlePopupRedact() {
  popupFormEdit.open();
  const dataUser = userInfo.getUserData();
  nameInput.value = dataUser.name;
  infoInput.value = dataUser.info;
  validationCard.clearFormErrors();
}
openButtonRedact.addEventListener('click', handlePopupRedact);

function handlePopupAdd() {
  popupFormAdd.open();
  validationCard.clearFormErrors();
  validationCard.disableButton();
}
openButtonAdd.addEventListener('click', handlePopupAdd);



const validationProfile = new FormValidator(config, formRedactElement);
validationProfile.enableValidation();

const validationCard = new FormValidator(config, formAddElement);
validationCard.enableValidation();