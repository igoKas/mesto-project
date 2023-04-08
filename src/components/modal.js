import { createCard } from "./card.js";
import { toggleButtonState, checkInputValidity } from "./validate.js";
import { getUserInfo, patchUserInfo, postCard , changeAvatar} from "./api.js";

export let profileId;
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarLink = document.querySelector('#avatar-link-input');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const cardPopup = document.querySelector('.card-popup');
const profilePopup = document.querySelector('.profile-popup');
const avatarPopup = document.querySelector('.avatar-popup');
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
	editBtn.addEventListener('click', () => {
		fillProfileForm();
		openPopup(profilePopup);
		Array.from(profilePopup.querySelectorAll('.form__input')).forEach(inputElement => {
			checkInputValidity(profilePopup, inputElement, {inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active'})
		})
	});
	addBtn.addEventListener('click', () => openPopup(cardPopup));
	profileAvatar.addEventListener('click', () => openPopup(avatarPopup));
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

getUserInfo().then(user => {
	profileAvatar.style.backgroundImage = `url(${user.avatar})`;
	profileName.textContent = user.name;
	profileAbout.textContent = user.about;
	profileId = user._id;
})

const handleProfileFormSubmit = (evt) => {
	evt.preventDefault();
	const buttonElement = evt.target.querySelector('.form__submit-btn');
	buttonElement.textContent = 'Сохранение...';
	patchUserInfo({
		name: nameInput.value,
		about: aboutInput.value
	}).then(res => {
		profileName.textContent = res.name;
		profileAbout.textContent = res.about;
		closePopup(profilePopup);
	}).finally(() => buttonElement.textContent = 'Сохранить')
}

const handleAddFormSubmit = (evt) => {
	evt.preventDefault();
	const inputList = Array.from(evt.target.querySelectorAll('.form__input'));
	const buttonElement = evt.target.querySelector('.form__submit-btn');
	const cardName = evt.target.placeInput;
	const cardLink = evt.target.linkInput;
	buttonElement.textContent = 'Сохранение...';
	postCard({
		name: cardName.value,
		link: cardLink.value,
	}).then(res => {
		const card = createCard(res);
		cardsList.prepend(card);
		evt.target.reset();
		toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'form__submit-btn_disabled'});
		closePopup(cardPopup);
	}).finally(() => buttonElement.textContent = 'Сохранить')
}

const handleChangeAvatarFormSubmit = evt => {
	evt.preventDefault();
	const inputList = Array.from(evt.target.querySelectorAll('.form__input'));
	const buttonElement = evt.target.querySelector('.form__submit-btn');
	buttonElement.textContent = 'Сохранение...';
	changeAvatar({avatar: avatarLink.value})
		.then(res => {
			profileAvatar.style.backgroundImage = `url(${res.avatar})`;
			evt.target.reset();
			toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'form__submit-btn_disabled'});
			closePopup(avatarPopup);
	}).finally(() => buttonElement.textContent = 'Сохранить')
}

const enableFormSubmition = () => {
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', function (evt) {
			if (evt.target.name === 'edit-profile-form') {
				handleProfileFormSubmit(evt);
			} else if (evt.target.name === 'add-card-form') {
				handleAddFormSubmit(evt);
			} else if (evt.target.name === 'change-avatar-form') {
				handleChangeAvatarFormSubmit(evt);
			}
				
		});
	})
}


export {setOpenPopupListeners,
	openPopup,
	setClosePopupListeners,
	enableFormSubmition
};