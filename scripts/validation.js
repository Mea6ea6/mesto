const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_state_invalid'
}

// ---- Валидация
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
};

function checkInputValidity(inputElement, formElement, config) {
  const isInputVa1id = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (!isInputVa1id) {
    showError(inputElement, errorElement, config);
  } else {
    hideError(inputElement, errorElement, config);
  }
};

function disabledButton(buttonElement, config) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
};
function enabledButton(buttonElement, config) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
};

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    disabledButton(buttonElement, config);
  }
  else {
    enabledButton(buttonElement, config);
  }
};

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButton, formElement.checkValidity(), config);

  [...inputList].forEach(function (inputElement) {
    inputElement.addEventListener('input', () => {
      toggleButtonState(submitButton, formElement.checkValidity(), config);
      checkInputValidity(inputElement, formElement, config);
    });
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
};

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);

  [...formList].forEach(function (formElement) {
    setEventListener(formElement, config);
  });
};