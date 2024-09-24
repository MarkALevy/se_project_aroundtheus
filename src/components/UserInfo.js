export default class UserInfo {
  constructor({ userName, userJob, userImg }) {
    this.userName = document.querySelector(userName);
    this.userJob = document.querySelector(userJob);
    this.userImg = document.querySelector(userImg);
  }
  getUserInfo() {
    this._userInfo = {
      userName: this.userName.textContent,
      userJob: this.userJob.textContent,
      // userImg: this.userImg.src,
    };
    return this._userInfo;
  }

  setUserInfo({ userName, userJob, userImg }) {
    this.userName.textContent = userName;
    this.userJob.textContent = userJob;
  }
}
