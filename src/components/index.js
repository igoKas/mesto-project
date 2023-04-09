import '../pages/index.css';

import { renderInitalCards, createCard, changeLike } from './card.js';

import { openPopup, closePopup, setClosePopupListeners } from './modal.js';

import { enableValidation, checkInputValidity, toggleButtonState } from './validate';

import { getUserInfo, getCards, likeCard, unlikeCard, deleteCard, patchUserInfo, postCard, changeAvatar } from './api';

import { renderUser } from './user';

const formList = Array.from(document.querySelectorAll('.form'));
const cardsList = document.querySelector('.cards__list')
const imagePopup = document.querySelector('.image-popup');
const cardImage = imagePopup.querySelector('.card-zoom__image');
const cardCaption = imagePopup.querySelector('.card-zoom__caption');
const profilePopup = document.querySelector('.profile-popup');
const profileButtonElement = profilePopup.querySelector('.form__submit-btn');
const nameInput = document.querySelector('#name-input');
const aboutInput = document.querySelector('#about-input');
const profileId = document.querySelector('.profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const profileAvatar = document.querySelector('.profile__avatar');
const avatarPopup = document.querySelector('.avatar-popup');
const avatarLink = document.querySelector('#avatar-link-input');
const avatarInputList = Array.from(avatarPopup.querySelectorAll('.form__input'));
const avatarButtonElement = avatarPopup.querySelector('.form__submit-btn')
const cardPopup = document.querySelector('.card-popup');
const cardInputList = Array.from(cardPopup.querySelectorAll('.form__input'));
const cardButtonElement = cardPopup.querySelector('.form__submit-btn');
const cardPlaceInput = cardPopup.querySelector('#place-input');
const cardLinkInput = cardPopup.querySelector('#link-input');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__add-btn');

Promise.all([getUserInfo(), getCards()])
	.then(res => {
		const userInfoRes = res[0];
		const cardsRes = res[1];
		const initialCards = [];
		renderUser(userInfoRes);

		cardsRes.forEach(cardData => {
			initialCards.push(createCard(cardData, userInfoRes._id, handleLikeCard, handleDeleteCard, handleCardClick));
		})

		renderInitalCards(initialCards);
		fillProfileForm();
		enableValidation({
			formSelector: '.form',
			fieldsetSelector: '.form__set',
			inputSelector: '.form__input',
			submitButtonSelector: '.form__submit-btn',
			inactiveButtonClass: 'form__submit-btn_disabled',
			inputErrorClass: 'form__input_type_error',
			errorClass: 'form__input-error_active'
		});
		
		enableFormSubmition();
		setClosePopupListeners();
		setOpenPopupListeners();
	})
	.catch(err => console.log(err))

function handleLikeCard(status, cardId, card) {
	!status ?
	likeCard(cardId)
		.then(res => changeLike(res, card))
		.catch(err => console.log(err))
	: unlikeCard(cardId)
		.then(res => changeLike(res, card))
		.catch(err => console.log(err))
}

function handleDeleteCard(cardId, card) {
	const cardDeleteBtn = card.querySelector('.card__delete-btn');
	deleteCard(cardId)
		.then(res => cardDeleteBtn.closest('.card').remove())
		.catch(err => console.log(err))
}

function handleCardClick(item) {
	cardImage.src = item.link;
	cardImage.alt = item.name;
	cardCaption.textContent = item.name;
	openPopup(imagePopup);
}

const fillProfileForm = () => {
	nameInput.value = profileName.textContent;
	aboutInput.value = profileAbout.textContent;
}

const handleProfileFormSubmit = evt => {
	evt.preventDefault();
	profileButtonElement.textContent = 'Сохранение...';
	patchUserInfo({
		name: nameInput.value,
		about: aboutInput.value
	}).then(res => {
		renderUser(res);
		closePopup(profilePopup);
	})
	.catch(err => console.log(err))
	.finally(() => profileButtonElement.textContent = 'Сохранить')
}

const handleAddFormSubmit = evt => {
	evt.preventDefault();
	cardButtonElement.textContent = 'Сохранение...';
	postCard({
		name: cardPlaceInput.value,
		link: cardLinkInput.value,
	}).then(res => {
		const card = createCard(res, profileId.id, handleLikeCard, handleDeleteCard, handleCardClick);
		cardsList.prepend(card);
		evt.target.reset();
		toggleButtonState(cardInputList, cardButtonElement, { inactiveButtonClass: 'form__submit-btn_disabled' });
		closePopup(cardPopup);
	})
	.catch(err => console.log(err))
	.finally(() => cardButtonElement.textContent = 'Сохранить')
}

const handleChangeAvatarFormSubmit = evt => {
	evt.preventDefault();
	avatarButtonElement.textContent = 'Сохранение...';
	changeAvatar({ avatar: avatarLink.value })
		.then(res => {
			renderUser(res);
			evt.target.reset();
			toggleButtonState(avatarInputList, avatarButtonElement, { inactiveButtonClass: 'form__submit-btn_disabled' });
			closePopup(avatarPopup);
		})
		.catch(err => console.log(err))
		.finally(() => avatarButtonElement.textContent = 'Сохранить')
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

const setOpenPopupListeners = () => {
	editBtn.addEventListener('click', () => {
		openPopup(profilePopup);
		Array.from(profilePopup.querySelectorAll('.form__input')).forEach(inputElement => {
			checkInputValidity(profilePopup, inputElement, {inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active'})
		})
	});
	addBtn.addEventListener('click', () => openPopup(cardPopup));
	profileAvatar.addEventListener('click', () => openPopup(avatarPopup));
}