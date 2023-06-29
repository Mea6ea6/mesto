// ---- Валидация
function showError(inputElement, errorElement) {
  inputElement.classList.add('popup__input_state_invalid');
  errorElement.textContent = inputElement.validationMessage;
};
function hideError(inputElement, errorElement) {
  inputElement.classList.remove('popup__input_state_invalid');
  errorElement.textContent = '';
};

function checkInputValidity(inputElement, formElement) {
  const isInputVa1id = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!isInputVa1id) {
    showError(inputElement, errorElement);
  } else {
    hideError(inputElement, errorElement);
  }
};

function disabledButton(buttonElement) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add('popup__submit-button_disabled');
};
function enabledButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit-button_disabled');
};

function toggleButtonState(buttonElement, isActive) {
  if (!isActive) {
    disabledButton(buttonElement);
  }
  else {
    enabledButton(buttonElement);
  }
};

function setEventListener(formElement) {
  const inputList = formElement.querySelectorAll('.popup__input');
  const submitButton = formElement.querySelector('.popup__submit-button');

  toggleButtonState(submitButton, formElement.checkValidity());

  [...inputList].forEach(function (inputElement) {
    inputElement.addEventListener('input', () => {
      toggleButtonState(submitButton, formElement.checkValidity());
      checkInputValidity(inputElement, formElement);
    });
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
};

function enableValidation() {
  const formList = document.querySelectorAll('.popup__form');

  [...formList].forEach(function (formElement) {
    setEventListener(formElement);
  });
};

const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_state_invalid'
}