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

  _request(url, options) {
    return fetch(url, options).then(this._handleRes);
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((data) => {
      return data;
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, { headers: this._headers })
    .then((data) => {
      return data;
    });
  }

  setUserInfo = ({ userName, userJob }) => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userName,
        about: userJob,
      }),
    })
    .then((data) => {
      return data;
    });
  };

  addNewCard = ({ cardName, cardLink }) => {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    })
    .then((data) => {
      return data;
    });
  };

  deleteCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  };

  likeCard = (cardId) => {
    return this._requesth(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  };

  removeLike = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  };

  editProfileImg = (input) => {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: input,
      }),
    });
  };
}
