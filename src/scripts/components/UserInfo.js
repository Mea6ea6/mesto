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

    setUserData(data) {
        this._nameElement.textContent = data.profile;
        this._infoElement.textContent = data.info;
    }
    
}

export { UserInfo }