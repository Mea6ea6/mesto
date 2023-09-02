import { Popup } from "./Popup.js";

class PopupWithCardDeleter extends Popup {

    constructor(popupSelector, popupSubmitCallback) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._submitBtn = this._formElement.querySelector('.popup__submit-button');
        this._submitBtnText = this._submitBtn.textContent
        this._popupSubmitCallback = popupSubmitCallback;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._popupSubmitCallback(this._card);
            this.close();
        });
    }

    renderLoading(isLoading, loadingText = 'Удаление...') {
        if (isLoading) {
            this._submitBtn.textContent = loadingText;
          } else {
            this._submitBtn.textContent = this._submitBtnText;
        }
    }

    setDeleteCard(callback){
        this._popupSubmitCallback = callback;
    }

    close() {
        super.close();
        this._formElement.reset();
    }
    
}

export { PopupWithCardDeleter }