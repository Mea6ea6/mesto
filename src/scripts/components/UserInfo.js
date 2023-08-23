class UserInfo {

    constructor({profile, info}) {
        this._profile = null;
        this._info = null;
        this._nameElement = profile;
        this._infoElement = info;
    }

    getUserData() {
        return {
            profile:this._profile,
            info:this._info
        }
    }

    setUserData(userData) {
        this._profile = userData.profile;
        this._info = userData.info;
        this.renewUserData();
    }

    renewUserData() {
        this._nameElement.textContent = this._profile;
        this._infoElement.textContent = this._info;
    }
    
}

export { UserInfo }