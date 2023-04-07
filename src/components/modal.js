import { createCard } from "./card.js";
import { toggleButtonState } from "./validate.js";

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const cardPopup = document.querySelector('.card-popup');
const profilePopup = document.querySelector('.profile-popup');
const formList = Array.from(document.querySelectorAll('.form'));
const cardsList = document.querySelector('.cards__list');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeByEscape); 
}
const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', closeByEscape);
}
const setOpenPopupListeners = () => {
	editBtn.addEventListener('click', () => openPopup(profilePopup));
	addBtn.addEventListener('click', () => openPopup(cardPopup));
}

const setClosePopupListeners = () => {
	const popups = document.querySelectorAll('.popup');
	popups.forEach((popup) => {
		popup.addEventListener('mousedown', (evt) => {
			if (evt.target.classList.contains('popup_opened')) {
				closePopup(popup)
			}
			if (evt.target.classList.contains('popup__close-btn')) {
			  closePopup(popup)
			}
		})
	})
}

const closeByEscape = (evt) => {
	if (evt.key === 'Escape') {
		const openedPopup = document.querySelector('.popup_opened');
		closePopup(openedPopup);
	}
}

const fillProfileForm = () => {
	nameInput.value = profileName.textContent;
	aboutInput.value = profileAbout.textContent;
}

const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();
	profileName.textContent = nameInput.value;
	profileAbout.textContent = aboutInput.value;
	closePopup(profilePopup);
}

const handleAddFormSubmit = (evt) => {
	evt.preventDefault();
	const inputList = Array.from(evt.target.querySelectorAll('.form__input'));
	const buttonElement = evt.target.querySelector('.form__submit-btn');
	const cardName = evt.target.placeInput;
	const cardLink = evt.target.linkInput;
	const card = createCard({ link: cardLink.value, name: cardName.value });
	cardsList.prepend(card);
	evt.target.reset();
	toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'form__submit-btn_disabled'});
	closePopup(cardPopup);
}

const enableFormSubmition = () => {
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			if (evt.target.name === 'edit-profile-form') {
				handleProfileFormSubmit(evt);
			} else if (evt.target.name === 'add-card-form')
				handleAddFormSubmit(evt);
		});
	})
}


export {setOpenPopupListeners,
	openPopup,
	fillProfileForm,
	setClosePopupListeners,
	enableFormSubmition
};