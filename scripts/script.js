//commonVar
const closeBtns = document.querySelectorAll('.popup__close-btn');
//editFormVar
const editBtn = document.querySelector('.profile__edit-btn');
const editForm = document.querySelector('[name="edit-profile-form"]');
const nameInput = editForm.querySelector('#name');
const aboutInput = editForm.querySelector('#about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
//addFormVar
const addBtn = document.querySelector('.profile__add-btn');
const addForm = document.querySelector('[name="add-card-form"]');
const cardName = addForm.querySelector('#place');
const cardLink = addForm.querySelector('#link');
//zoomImagePopupVar
const imagePopup = document.querySelector('.card-zoom');
const cardImage = imagePopup.querySelector('.card-zoom__image');
const cardCaption = imagePopup.querySelector('.card-zoom__caption');
//commonFunc
function openPopup (evt) {
	if (evt.target === editBtn) {
		editForm.closest('.popup').classList.add('popup_opened');
		nameInput.value = profileName.textContent;
		aboutInput.value = profileAbout.textContent;
	}
	if (evt.target === addBtn) {
		addForm.closest('.popup').classList.add('popup_opened');
	}
	if (evt.target.classList.contains('card__image')) {
		imagePopup.closest('.popup').classList.add('popup_opened');
		cardImage.setAttribute('src', evt.target.getAttribute('src'));
		cardCaption.textContent = evt.target.parentElement.querySelector('.card__name').textContent;
	}
}


function closePopup (evt) {
	evt.target.closest('.popup').classList.remove('popup_opened');
}

function likeListener(card) {
	const cardLike = card.querySelector('.card__like-btn');
	cardLike.addEventListener('click', function() {
		cardLike.classList.toggle('card__like-btn_liked');
	});
}

function deleteListener(card) {
	const deleteCard = card.querySelector('.card__delete-btn');
	deleteCard.addEventListener('click', function() {
		deleteCard.closest('.card').remove();
	});
}

function openListener(card) {
	const openImage = card.querySelector('.card__image');
	openImage.addEventListener('click', openPopup)
}

closeBtns.forEach(function (btn) {
	btn.addEventListener('click', closePopup)
});

//editFormFunc
function editFormSubmitHandler (evt) {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = aboutInput.value;
	closePopup(evt);
}

editBtn.addEventListener('click', openPopup);
editForm.addEventListener('submit', editFormSubmitHandler);

//addFormFunc
function addFormSubmitHandler (evt) {
	evt.preventDefault();
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	card.querySelector('.card__image').src = cardLink.value;
	card.querySelector('.card__name').textContent = cardName.value;
	likeListener(card);
	deleteListener(card);
	openListener(card);
	cardsList.prepend(card);
	closePopup(evt);
}

addBtn.addEventListener('click', openPopup);
addForm.addEventListener('submit', addFormSubmitHandler);

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
initialCards.forEach(function(i) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	card.querySelector('.card__image').src = i.link;
	card.querySelector('.card__name').textContent = i.name;
	likeListener(card);
	deleteListener(card);
	openListener(card);
	cardsList.append(card);
})
