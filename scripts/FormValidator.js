import { config } from './constants'
// ---- Валидация
class FormValidator {
  constructor(config, formElement) {

  }
  showError(inputElement, errorElement, config) {
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }
  hideError(inputElement, errorElement, config) {
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(inputElement, formElement, config) {
    const isInputVa1id = inputElement.validity.valid;
    const errorElement = formElement.querySelector(
      `#${inputElement.name}-error`
    );
    if (!isInputVa1id) {
      showError(inputElement, errorElement, config);
    } else {
      hideError(inputElement, errorElement, config);
    }
  }

  disableButton(buttonElement, config) {
    buttonElement.disabled = "disabled";
    buttonElement.classList.add(config.inactiveButtonClass);
  }
  enableButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }

  toggleButtonState(buttonElement, isActive, config) {
    if (!isActive) {
      disableButton(buttonElement, config);
    } else {
      enableButton(buttonElement, config);
    }
  }

  setEventListener(formElement, config) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(submitButton, formElement.checkValidity(), config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        toggleButtonState(submitButton, formElement.checkValidity(), config);
        checkInputValidity(inputElement, formElement, config);
      });
    });

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  enableValidation(config) {
    const formList = document.querySelectorAll(config.formSelector);

    formList.forEach((formElement) => {
      setEventListener(formElement, config);
    });
  }
}

clearFormErrors = (form, config) => {
  const inputList = form.querySelectorAll(config.inputSelector);
  inputList.forEach((input) => {
    const errorElement = form.querySelector(`#${input.name}-error`);
    hideError(input, errorElement, config);
  });
};