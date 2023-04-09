const cardsList = document.querySelector('.cards__list');

const renderInitalCards = (cards) => {
	cards.forEach(card => {
		cardsList.append(card);
	})
}

const createCard = (cardData, profileId, handleLikeCard, handleDeleteCard, handleCardClick) => {
	const cardTemplate = document.querySelector('#card-template').content;
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = card.querySelector('.card__image');
	const cardName = card.querySelector('.card__name');
	const cardLikeCounter = card.querySelector('.card__like-counter');
	const cardLikeBtn = card.querySelector('.card__like-btn');
	const cardDelete = card.querySelector('.card__delete-btn');
	const cardLikes = cardData.likes;
	const cardOwnerId = cardData.owner._id;
	card.id = cardData._id;
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardName.textContent = cardData.name;
	cardLikeCounter.textContent = cardData.likes.length;
	if (cardLikes.some(user => user._id === profileId)) cardLikeBtn.classList.add('card__like-btn_liked');
	cardLikeBtn.addEventListener('click', () => {
		handleLikeCard(checkStatusLike(cardLikeBtn), card.id, card)
	});

	if (cardOwnerId !== profileId) {
		cardDelete.style.display = 'none';
	} else {
		cardDelete.addEventListener('click', () => handleDeleteCard(card.id, card));
	}
	cardImage.addEventListener('click', () => handleCardClick(cardData));

	return card;
}

function checkStatusLike(cardLikeBtn) {
	return cardLikeBtn.classList.contains('card__like-btn_liked')
}

function changeLike(res, card) {
	const likeCounter = card.querySelector('.card__like-counter');
	const cardLike = card.querySelector('.card__like-btn')
	likeCounter.textContent = res.likes.length;
	cardLike.classList.toggle('card__like-btn_liked');
}


export { renderInitalCards, createCard, changeLike };