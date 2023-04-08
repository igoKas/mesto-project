import { openPopup, profileId } from './modal.js';
import { getCards, deleteCard, likeCard, unlikeCard } from './api.js';

const imagePopup = document.querySelector('.image-popup');
const cardsList = document.querySelector('.cards__list');

const setLikeListener = (card, cardId) => {
	const cardLike = card.querySelector('.card__like-btn');
	const likeCounter = card.querySelector('.card__like-counter');
	cardLike.addEventListener('click', () => {
		if (cardLike.classList.contains('card__like-btn_liked')) {
			unlikeCard(cardId).then(res => {
				likeCounter.textContent = res.likes.length;
				cardLike.classList.toggle('card__like-btn_liked');
			})
		} else {
			likeCard(cardId).then(res => {
				likeCounter.textContent = res.likes.length;
				cardLike.classList.toggle('card__like-btn_liked');
			})
		}
	});
}

const setDeleteListener = (card, cardId) => {
	const cardDelete = card.querySelector('.card__delete-btn');
	cardDelete.addEventListener('click', () => {
		deleteCard(cardId).then(res => {
			cardDelete.closest('.card').remove();
		})
	});
}

const handleCardClick = (item) => {
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
	const cardLikeCounter = card.querySelector('.card__like-counter');
	const cardLikeBtn = card.querySelector('.card__like-btn')
	const cardDelete = card.querySelector('.card__delete-btn');
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardName.textContent = item.name;
	cardLikeCounter.textContent = item.likes.length;
	if (item.owner._id !== profileId) {

		cardDelete.style.display = 'none';
	} else {
		setDeleteListener(card, item._id);
	}
	item.likes.forEach((user) => {
		if (user._id === profileId) {
			cardLikeBtn.classList.toggle('card__like-btn_liked');
			return
		}
	})
	setLikeListener(card, item._id);
	cardImage.addEventListener('click', () => handleCardClick(item));
	return card;
}

const renderInitalCards = () => {
	getCards().then(initialCards => {
		initialCards.forEach(function (item) {
			const card = createCard(item);
			cardsList.append(card);
		})
	})
}

export { renderInitalCards, createCard };