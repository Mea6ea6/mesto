class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData))
    }

    getAllInfo(){
        return Promise.all([this.getUserData(), this.getAllCards()])
    }

    getAllCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this.#onResponse)
    }

    getCardById(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            headers: this._headers
        })
            .then(this.#onResponse)
    }

    changeCardLike(cardId, isLiked) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
        })
            .then(this.#onResponse)
    }

    deleteCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponse)
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponse)
    }

    getUserData(){
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
            .then(this.#onResponse)
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
            .then(this.#onResponse)
    }

    editProfileAvatar(link){
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link.avatar,
            })
        })
            .then(this.#onResponse)
    }
};

export { Api };