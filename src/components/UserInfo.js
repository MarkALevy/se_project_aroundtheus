export default class UserInfo {
  constructor({ userName, userJob }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
  }
  getUserInfo() {
    this._userInfo = {
      userName: this.userName.textContent,
      userJob: this.userJob.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ userName, userJob }) {
    this.userName.textContent = userName;
    this.userJob.textContent = userJob;
  }
}
