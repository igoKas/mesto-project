import '../pages/index.css';

import { enableValidation } from './validate.js';

import { renderInitalCards } from './card.js';

import { setOpenPopupListeners, initialFillEditForm, setClosePopupListeners } from './modal.js';

renderInitalCards();

initialFillEditForm();

setClosePopupListeners();

setOpenPopupListeners();

enableValidation({
	formSelector: '.form',
	fieldsetSelector: '.form__set',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__submit-btn',
	inactiveButtonClass: 'form__submit-btn_disabled',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__input-error_active'
  }); 

