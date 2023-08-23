import { Popup } from './Popup.js';

class PopupWithForm extends Popup{

    constructor(popupSelector, {submitHandler = null}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._formValues = {};
        [...this._inputList].forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
            this.close();
        });
    }

    close(){
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', super._closePopupByEsc);
        this._formElement.reset();
    }

}

export { PopupWithForm }