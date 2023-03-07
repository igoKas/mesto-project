//commonVar
const closeBtns = document.querySelectorAll('.popup__close-btn');
//editFormVar
const editBtn = document.querySelector('.profile__edit-btn');
const profilePopup = document.querySelector('.profile-popup');
const editForm = document.forms['edit-profile-form'];
const nameInput = editForm.querySelector('#name');
const aboutInput = editForm.querySelector('#about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//addFormVar
const addBtn = document.querySelector('.profile__add-btn');
const cardPopup = document.querySelector('.card-popup');
const addForm = document.forms['add-card-form'];
const cardName = addForm.querySelector('#place');
const cardLink = addForm.querySelector('#link');
//zoomImagePopupVar
const imagePopup = document.querySelector('.image-popup');
const cardImage = imagePopup.querySelector('.card-zoom__image');
const cardCaption = imagePopup.querySelector('.card-zoom__caption');
//commonFunc
function openPopup(popup) {
	popup.classList.add('popup_opened');
}

function closePopup(popup) {
	popup.classList.remove('popup_opened');
}

function setLikeListener(card) {
	const cardLike = card.querySelector('.card__like-btn');
	cardLike.addEventListener('click', function() {
		cardLike.classList.toggle('card__like-btn_liked');
	});
}

function SetDeleteListener(card) {
	const deleteCard = card.querySelector('.card__delete-btn');
	deleteCard.addEventListener('click', function() {
		deleteCard.closest('.card').remove();
	});
}

function setImageClickListener(card) {
	const openImage = card.querySelector('.card__image');
	openImage.addEventListener('click', function (evt) {
		openPopup(imagePopup);
		cardImage.setAttribute('src', evt.target.getAttribute('src'));
		cardCaption.textContent = evt.target.parentElement.querySelector('.card__name').textContent;
	});
}

closeBtns.forEach(function (btn) {
	const popup = btn.closest('.popup');
	btn.addEventListener('click', () => closePopup(popup));
});

function createCard (item) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	card.querySelector('.card__image').src = item.link;
	card.querySelector('.card__image').alt = item.name;
	card.querySelector('.card__name').textContent = item.name;
	setLikeListener(card);
	SetDeleteListener(card);
	setImageClickListener(card);
	return card;
}

//editFormFunc
function handleProfileFormSubmit (evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = aboutInput.value;
	closePopup(profilePopup);
}

editBtn.addEventListener('click', function () {
	openPopup(profilePopup);
	nameInput.value = profileName.textContent;
	aboutInput.value = profileAbout.textContent;
});
editForm.addEventListener('submit', handleProfileFormSubmit);

//addFormFunc
function handleAddFormSubmit (evt) {
	evt.preventDefault();
	const card = createCard({link: cardLink.value, name: cardName.value});
	cardsList.prepend(card);
	evt.target.reset();
	closePopup(cardPopup);
}

addBtn.addEventListener('click', () => openPopup(cardPopup));
addForm.addEventListener('submit', handleAddFormSubmit);

//showInitialCards
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

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');
initialCards.forEach(function(item) {
	const card = createCard(item);
	cardsList.append(card);
})