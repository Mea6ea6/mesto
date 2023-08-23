class Popup {
    
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
    }

    open(){
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', (evt) => {this._closePopupByEsc(evt)});
    }

    close(){
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', (evt) => {this._closePopupByEsc(evt)});
    }

    _closePopupByEsc(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('mousedown', evt => {
            if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
                this.close();
            }
        })
    }

}

export { Popup }