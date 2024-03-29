const showInputError = (formElement, inputElement, errorMessage, settings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(settings.inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(settings.inputErrorClass);
	errorElement.classList.remove(settings.errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
	if (inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	} else {
		inputElement.setCustomValidity("");
	}

	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, settings);
	} else {
		hideInputError(formElement, inputElement, settings);
	}
};

const setEventListeners = (formElement, settings) => {
	const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
	const buttonElement = formElement.querySelector(settings.submitButtonSelector);
	toggleButtonState(inputList, buttonElement, settings);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', function () {
			checkInputValidity(formElement, inputElement, settings);
			toggleButtonState(inputList, buttonElement, settings);
		});
	});
};

const enableValidation = (settings) => {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsetSelector));
		fieldsetList.forEach((fieldset) => {
			setEventListeners(fieldset, settings);
		});
	});
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

const toggleButtonState = (inputList, buttonElement, settings) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(settings.inactiveButtonClass);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(settings.inactiveButtonClass);
	};
};

const checkOpenPopupInputsValidity = popup => {
	Array.from(popup.querySelectorAll('.form__input')).forEach(inputElement => {
		checkInputValidity(popup, inputElement, {inputErrorClass: 'form__input_type_error', errorClass: 'form__input-error_active'})
	})
}

export { enableValidation, toggleButtonState, checkOpenPopupInputsValidity };