class UserInfo {

    constructor({profileSelector, infoSelector, avatarSelector}) {
        this._nameElement = document.querySelector(profileSelector); 
        this._infoElement = document.querySelector(infoSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserData() {
        return {
            profile: this._nameElement.textContent,
            info: this._infoElement.textContent,
            avatar: this._avatarElement.src
        }
    }

    setUserData(data) {
        this._nameElement.textContent = data.profile;
        this._infoElement.textContent = data.info;
        this._avatarElement.src = data.avatar;
        this._idElement = data.info;
    }
    
}

export { UserInfo }