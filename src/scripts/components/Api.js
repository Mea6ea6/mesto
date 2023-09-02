class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    #onResponce(res) {
        return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData))
    }

    getAllInfo(){
        return Promise.all([this.getUserData(), this.getAllCards()])
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    getCardById(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    changeCardLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
            .then(this.#onResponce)
    }

    deleteCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(this.#onResponce)
    }

    getUserData(){
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    editProfile(data){
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.profile,
                about: data.info,
            })
        })
            .then(this.#onResponce)
    }

    editProfileAvatar(link){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link.avatar,
            })
        })
            .then(this.#onResponce)
    }
};

export { Api };