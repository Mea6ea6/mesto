import { Popup } from './Popup.js';

class PopupWithForm extends Popup{

    constructor(popupSelector, {submitHandler = null}) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
        this._submitBtn = this._formElement.querySelector('.popup__submit-button');
        this._submitBtnText = this._submitBtn.textContent;
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach(input => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValues());
        });
    }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitBtn.textContent = loadingText;
          } else {
            this._submitBtn.textContent = this._submitBtnText;
        }
    }

    close() {
        super.close();
        this._formElement.reset();
    }

}

export { PopupWithForm }