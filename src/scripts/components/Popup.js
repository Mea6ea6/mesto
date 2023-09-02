class Popup {
    
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closePopupByEsc= this._closePopupByEsc.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._closePopupByEsc);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closePopupByEsc);
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