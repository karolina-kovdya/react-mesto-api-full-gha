class Api {
  #url;
  #header;

  constructor({ url, headers }) {
    this.#url = url;
    this.#header = headers;
  }

  #checkRes(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getCards() {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/cards`, 
    {  headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    }, })
    .then(
      this.#checkRes
    );
  }

  getUserInfo() {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/users/me`, 
    {  headers: {
      authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    }, })
    .then(
      this.#checkRes
    );
  }

  editProfile(name, about) {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify( name, about ),
    }).then(this.#checkRes);
  }

  changeAvatar(avatar) {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    }).then(this.#checkRes);
  }

  addNewCard(name, link) {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify( name, link ),
    }).then(this.#checkRes);
  }

  addLike(card) {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/cards/${card._id}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then(this.#checkRes);
  }

  deleteLike(card) {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/cards/${card._id}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then(this.#checkRes);
  }

  changeLikeCardStatus(isLiked, card) {
    if(!isLiked) {
      return this.addLike(card)
    } else {
      return this.deleteLike(card)
    }
  }

  deleteCard(id) {
    const jwt = localStorage.getItem("jwt")
    return fetch(`${this.#url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    }).then(this.#checkRes);
  }
}

const api = new Api({
  url: "http://localhost:3000",
  // url: "https://mesto.nomoreparties.co/v1/cohort-55",
  // headers: {
  //   authorization: `Bearer ${jwt}`,
  //   "Content-Type": "application/json",
  // },
});

export default api;
