export default class UserInfo {
  constructor({ name, job }) {
    this.name = document.querySelector(name);
    this.job = document.querySelector(job);
  }
  getUserInfo() {
    this._userInfo = {
      name: this.name.textContent,
      job: this.job.textContent,
    };
    return this._userInfo;
  }
  setUserInfo({ name, job }) {
    this.name.textContent = name;
    this.job.textContent = job;
  }
}
