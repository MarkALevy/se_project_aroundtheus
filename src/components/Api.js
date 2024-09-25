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
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then((res) => this._handleRes(res))
      .then((data) => {
        return data;
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
        console.error("Failed to add new card", err);
      });
  };

  deleteCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleRes(res));
  };

  likeCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._handleRes(res));
  };

  removeLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._handleRes(res));
  };

  editProfileImg = (input) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: input,
      }),
    }).then((res) => this._handleRes(res));
  };
}
