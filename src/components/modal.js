import { createCard } from "./card.js";

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const cardPopup = document.querySelector('.card-popup');
const profilePopup = document.querySelector('.profile-popup');

const setOpenPopupListeners = () => {
	const editBtn = document.querySelector('.profile__edit-btn');
	const addBtn = document.querySelector('.profile__add-btn');
	editBtn.addEventListener('click', () => openPopup(profilePopup));
	addBtn.addEventListener('click', () => openPopup(cardPopup));
}

const openPopup = (popup) => popup.classList.add('popup_opened');

const closePopup = (popup) => popup.classList.remove('popup_opened');

const initialFillEditForm = () => {
	nameInput.value = profileName.textContent;
	aboutInput.value = profileAbout.textContent;
}

const setClosePopupListeners = () => {
	const popups = document.querySelectorAll('.popup');
	const closePopupBtns = document.querySelectorAll('.popup__close-btn');
	popups.forEach(function (popup) {
		popup.addEventListener('click', (evt) => closePopup(evt.target));
		window.addEventListener('keydown', function (evt) {
			if (evt.key === 'Escape') {
				closePopup(popup);
			}
		});
		closePopupBtns.forEach(function (btn) {
			const popup = btn.closest('.popup');
			btn.addEventListener('click', () => closePopup(popup));
		});
	});
}

const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = aboutInput.value;
	closePopup(profilePopup);
}

const handleAddFormSubmit = (evt) => {
	evt.preventDefault();
	const cardsList = document.querySelector('.cards__list');
	const cardName = evt.target.placeInput;
	const cardLink = evt.target.linkInput;
	const card = createCard({ link: cardLink.value, name: cardName.value });
	cardsList.prepend(card);
	evt.target.reset();
	closePopup(cardPopup);
}

export {setOpenPopupListeners,
	openPopup,
	initialFillEditForm,
	setClosePopupListeners,
	handleProfileFormSubmit,
	handleAddFormSubmit
};