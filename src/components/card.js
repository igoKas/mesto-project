import {openPopup} from './modal.js';

const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

const setLikeListener = (card) => {
	const cardLike = card.querySelector('.card__like-btn');
	cardLike.addEventListener('click', function () {
		cardLike.classList.toggle('card__like-btn_liked');
	});
}

const setDeleteListener = (card) => {
	const deleteCard = card.querySelector('.card__delete-btn');
	deleteCard.addEventListener('click', function () {
		deleteCard.closest('.card').remove();
	});
}

const handleCardClick = (item) => {
	const imagePopup = document.querySelector('.image-popup');
	const cardImage = imagePopup.querySelector('.card-zoom__image');
	const cardCaption = imagePopup.querySelector('.card-zoom__caption');
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardCaption.textContent = item.name;
	openPopup(imagePopup);
}

const createCard = (item) => {
	const cardTemplate = document.querySelector('#card-template').content;
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = card.querySelector('.card__image');
	const cardName = card.querySelector('.card__name');
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardName.textContent = item.name;
	setLikeListener(card);
	setDeleteListener(card);
	cardImage.addEventListener('click', () => handleCardClick(item));
	return card;
}

const renderInitalCards = () => {
	const cardsList = document.querySelector('.cards__list');
	initialCards.forEach(function (item) {
		const card = createCard(item);
		cardsList.append(card);
	})
}

export { renderInitalCards, createCard };