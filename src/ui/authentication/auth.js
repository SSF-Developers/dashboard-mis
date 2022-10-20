import Storage from "../../Classes/Storage";

class auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  logout() {
    Storage.clearAll()
  }
}

export default new auth();
