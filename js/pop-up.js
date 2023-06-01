let bgScroll = document.querySelector('.background');
let openButton = document.querySelectorAll('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__submit-button');
let nameOutput = document.querySelector('.profile__name');
let jobOutput = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_name');
let jobInput = formElement.querySelector('.popup__field_job');

openButton.forEach((button) => {
    button.addEventListener('click', () => {
        nameInput.value = nameOutput.textContent;
        jobInput.value = jobOutput.textContent;
        popup.classList.add('popup_opened');
        bgScroll.classList.add('background_scroll');
    })
});
closeButton.addEventListener('click',() => {
    popup.classList.remove('popup_opened');
    bgScroll.classList.remove('background_scroll');
});

submitButton.addEventListener('click',() => {
    popup.classList.remove('popup_opened');
    bgScroll.classList.remove('background_scroll');
    if (nameInput.value === '' || jobInput.value === '') {
        nameInput.value = nameOutput.textContent;
        jobInput.value = jobOutput.textContent;
    } else {
        function handleFormSubmit (evt) {
            evt.preventDefault();
            nameOutput.textContent = nameInput.value;
            jobOutput.textContent = jobInput.value;
        }
        formElement.addEventListener('submit', handleFormSubmit);
    }
});

function validate(input){
    if(/^\s/.test(input.value))
      input.value = '';
}