const checkResponse = response =>
	response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`)

export const BASE_URL = 'https://auth.nomoreparties.co'

export const register = (email, password) => {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password: `${password}`,
			email: `${email}`,
		}),
	}).then(checkResponse)
}

export const authorization = (email, password) => {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password: `${password}`,
			email: `${email}`,
		}),
	}).then(checkResponse)
}

export const tokenValidity = token => {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	}).then(checkResponse)
}
