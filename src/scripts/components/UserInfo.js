class UserInfo {

    constructor({profileSelector, infoSelector}) {
        this._nameElement = document.querySelector(profileSelector); 
        this._infoElement = document.querySelector(infoSelector);
    }

    getUserData() {
        return {
            profile: this._nameElement.textContent,
            info: this._infoElement.textContent
        }
    }

    setUserData({profile, info}) {
        this._nameElement.textContent = profile;
        this._infoElement.textContent = info;
    }
    
}

export { UserInfo }