class UserInfo {

    constructor({name, info}) {
        this._name = null;
        this._info = null;
        this._nameElement = name;
        this._infoElement = info;
    }

    getUserData() {
        return {
            name:this._name,
            info:this._info
        }
    }

    setUserData(userData) {
        this._name = userData.name;
        this._info = userData.info;
        this.renewUserData();
    }

    renewUserData() {
        this._nameElement.textContent = this._name;
        this._infoElement.textContent = this._info;
    }
    
}

export { UserInfo }