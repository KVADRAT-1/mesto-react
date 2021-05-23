const handleResponse = res => {
	if (!res.ok) {
		return Promise.reject(`Error: ${res.status}`)
	}
	return res.json()
}

class Api {
	constructor(options) {
		this.options = options
	}

	getInitialCards() {
		return fetch(`${this.options.baseUrl}/cards`, {
			headers: this.options.headers,
		}).then(handleResponse)
	}

	getUserInformation() {
		return fetch(`${this.options.baseUrl}/users/me`, {
			headers: this.options.headers,
		}).then(handleResponse)
	}

	addUserAvatar(data) {
		return fetch(`${this.options.baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this.options.headers,
			body: JSON.stringify({
				avatar: data.avatar,
			}),
		}).then(handleResponse)
	}

	addUserInformation(data) {
		return fetch(`${this.options.baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this.options.headers,
			body: JSON.stringify({
				name: data.name,
				about: data.about,
			}),
		}).then(handleResponse)
	}

	getCard(data) {
		return fetch(`${this.options.baseUrl}/cards`, {
			method: 'POST',
			headers: this.options.headers,
			body: JSON.stringify({
				name: data.name,
				link: data.link,
			}),
		}).then(handleResponse)
	}

	addLike(cardId) {
		return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: this.options.headers,
		}).then(handleResponse)
	}

	deleteLike(cardId) {
		return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: this.options.headers,
		}).then(handleResponse)
	}

	deleteCard(cardId) {
		return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this.options.headers,
		}).then(handleResponse)
	}
}

const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
	headers: {
		authorization: '2c8f1154-7802-4bb0-9c57-35d128128b7a',
		'Content-Type': 'application/json',
	},
})

export default api
