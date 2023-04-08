const server = "https://mesto.nomoreparties.co/v1/plus-cohort-22";

async function api(uri, data, method) {
	let options = {
		headers: {
			authorization: 'e8286efd-49b8-4cdc-bbfa-0c7d47fdc660'
		}
	};

	if (data) {
		options = {
			method,
			headers: {
				authorization: 'e8286efd-49b8-4cdc-bbfa-0c7d47fdc660',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
	}

	// return fetch(server + uri, options)
	// 	.then(res => {
	// 		if (res.ok) return res.json();
	// 		return Promise.reject(`Ошибка: ${res.status}`);
	// 	})
	try {
		const response = await fetch(server + uri, options);
		if (!response.ok) {
			throw new Error('Ответ сети был не ok.');
		}
		const result = await response.json();
		return result
	} catch (error) {
		console.log('Возникла проблема с вашим fetch запросом: ', error.message);
	}
}

export function getUserInfo() {
	return api('/users/me')
}

export function patchUserInfo(data) {
	return api('/users/me', data, 'PATCH')
}

export  function getCards() {
	return api('/cards')
}

export function postCard(data) {
	return api('/cards', data, 'POST')
}

export function deleteCard(id) {
	return api(`/cards/${id}`, {}, 'DELETE')
}

export function likeCard(id) {
	return api(`/cards/likes/${id}`, {}, 'PUT')
}

export function unlikeCard(id) {
	return api(`/cards/likes/${id}`, {}, 'DELETE')
}

export function changeAvatar(data) {
	return api('/users/me/avatar', data, 'PATCH')
}