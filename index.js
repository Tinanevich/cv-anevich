const burgerButton = document.getElementById('button__burger');
const popupMenu = document.getElementById('popup__menu');
const closeButtons = document.querySelectorAll('.close');

burgerButton.addEventListener('click', () => {
    popupMenu.classList.add('popup--open')
})

closeButtons.forEach(item => {
    item.addEventListener('click', closeMenu);
});

function closeMenu() {
    popupMenu.classList.remove('popup--open');
}
const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
            closeMenu();
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

const form = document.getElementById("form");
const formInputName = document.getElementById("input-name");
const formInputEmail = document.getElementById("input-email");
const formInputMessage = document.getElementById("input-message");
const formInputCheckbox = document.getElementById("form-checkbox");
const labelName = document.getElementById("label-name");
const labelEmail = document.getElementById("label-email");
const labelMessage = document.getElementById("label-message");
const labelCheckbox = document.getElementById("label-checkbox");

let isClicked = false;

formInputName.addEventListener('input', () => {
    if (isClicked) {
    if (!formInputName.value.length) {
        labelName.innerHTML = 'Введите Имя';
        labelName.classList.add("form__label--error");
    } else if (!nameIsValid(formInputName.value)) {
        labelName.innerHTML = 'Имя содержит меньше 2 знаков'
        labelName.classList.add("form__label--error");
    } else {
        labelName.classList.remove("form__label--error");
    }
    }
});

formInputEmail.addEventListener('input', () => {
    if (isClicked) {
    if (!formInputEmail.value.length) {
        labelEmail.innerHTML = 'Введите Email'
        labelEmail.classList.add("form__label--error");
    } else if (!emailIsValid(formInputEmail.value)) {
        labelEmail.innerHTML = 'Некорректный Email';
        labelEmail.classList.add("form__label--error");
    } else {
        labelEmail.classList.remove("form__label--error");
    }
    }
});

formInputMessage.addEventListener('input', () => {
    if (isClicked) {
    if (!formInputMessage.value.length && clicked) {
        labelMessage.innerHTML = 'Введите сообщение';
        labelMessage.classList.add("form__label--error");
    } else if (!messageIsValid(formInputMessage.value)) {
        labelMessage.innerHTML = 'Введите минимум 10 знаков';
        labelMessage.classList.add("form__label--error");
    } else {
        labelMessage.classList.remove("form__label--error");
    }
    }
});

formInputCheckbox.addEventListener('input', () => {
    if (isClicked) {
        if (!formInputCheckbox.checked) {
          labelCheckbox.classList.add("form__label--error");
        } else {
          labelCheckbox.classList.remove("form__label--error");
        }
      }
    }
)

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function nameIsValid (name) {
    return name.trim().length > 1;
}
function messageIsValid (message) {
    return message.trim().length > 10
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    labelName.classList.remove("form__label--error");
    labelEmail.classList.remove("form__label--error");
    labelMessage.classList.remove("form__label--error");
    labelCheckbox.classList.remove("form__label--error");
    const email = formInputEmail.value;
    const name = formInputName.value;
    const message = formInputMessage.value;
    const checkbox = formInputCheckbox.checked;
    isClicked = true;
        if (!email.length) {
            labelEmail.innerHTML = 'Введите Email'
            labelEmail.classList.add("form__label--error");
        } else if (!emailIsValid(email)) {
            labelEmail.innerHTML = 'Некорректный Email';
            labelEmail.classList.add("form__label--error");
        }
        if (!name.length) {
            labelName.innerHTML = 'Введите имя';
            labelName.classList.add("form__label--error");
        } else if (!nameIsValid(name)) {
            labelName.innerHTML = 'Имя содержит меньше 2 знаков'
            labelName.classList.add("form__label--error");
        }
        if (!message.length) {
            labelMessage.innerHTML = 'Введите сообщение';
            labelMessage.classList.add("form__label--error");
        } else if (!messageIsValid(message)) {
            labelMessage.innerHTML = 'Введите минимум 10 знаков';
            labelMessage.classList.add("form__label--error");
        }
        if (!checkbox) {
            labelCheckbox.classList.add("form__label--error");
            labelCheckbox.innerHTML = 'Поставьте галочку';
        } else {
            labelCheckbox.classList.remove("form__label--error");
        }
        if (messageIsValid(message) && nameIsValid(name) && emailIsValid(email)) {
            if (checkbox) {
                query();
                formInputEmail.value = "";
                formInputName.value = "";
                formInputMessage.value = "";
                formInputCheckbox.checked = false;
            }
            } else {
              formInputEmail.value = "";
              formInputName.value = "";
              formInputMessage.value = "";
            }

});

const query = async () => {

    let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: new FormData(form)
    });

    const message = await response.json()

   return await response.json(alert(`Данные отправлены, ваш номер ${message.id}`));
}