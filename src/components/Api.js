export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleRes = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
      .then((res) => this._handleRes(res))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => this._handleRes(res))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setUserInfo = ({ userName, userJob }) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    })
      .then((res) => this._handleRes(res))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  addNewCard = ({ cardName, cardLink }) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    })
      .then((res) => this._handleRes(res))
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._handleRes(res))
      .catch((err) => {
        console.error(err);
      });
  };
}
