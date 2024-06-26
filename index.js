const button = document.getElementById('button__burger');
const popup = document.getElementById('popup');

button.addEventListener('click', () => {
    popup.classList.add('popup--open')
})
const closes = document.querySelectorAll('.close');
    closes.forEach(item => {
        item.addEventListener('click', close);
    });
function close() {
    popup.classList.remove('popup--open');
}
const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');
            close();
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

const form = document.getElementById("form");
const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const inputMessage = document.getElementById("input-message");
const inputCheckbox = document.getElementById("form-checkbox");
const labelName = document.getElementById("label-name");
const labelEmail = document.getElementById("label-email");
const labelMessage = document.getElementById("label-message");
const labelCheckbox = document.getElementById("label-checkbox");

let clicked = false;

inputName.addEventListener('input', () => {
    if (clicked) {
    if (!inputName.value.length) {
        labelName.innerHTML = 'Введите Имя';
        labelName.classList.add("form__label--error");
    } else if (!nameIsValid(inputName.value)) {
        labelName.innerHTML = 'Имя содержит меньше 2 знаков'
        labelName.classList.add("form__label--error");
    } else {
        labelName.classList.remove("form__label--error");
    }
    }
});

inputEmail.addEventListener('input', () => {
    if (clicked) {
    if (!inputEmail.value.length) {
        labelEmail.innerHTML = 'Введите Email'
        labelEmail.classList.add("form__label--error");
    } else if (!emailIsValid(inputEmail.value)) {
        labelEmail.innerHTML = 'Некорректный Email';
        labelEmail.classList.add("form__label--error");
    } else {
        labelEmail.classList.remove("form__label--error");
    }
    }
});

inputMessage.addEventListener('input', () => {
    if (clicked) {
    if (!inputMessage.value.length && clicked) {
        labelMessage.innerHTML = 'Введите сообщение';
        labelMessage.classList.add("form__label--error");
    } else if (!messageIsValid(inputMessage.value)) {
        labelMessage.innerHTML = 'Введите минимум 10 знаков';
        labelMessage.classList.add("form__label--error");
    } else {
        labelMessage.classList.remove("form__label--error");
    }
    }
});

inputCheckbox.addEventListener('input', () => {
    if (clicked) {
        if (!inputCheckbox.checked) {
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
    const email = inputEmail.value;
    const name = inputName.value;
    const message = inputMessage.value;
    const checkbox = inputCheckbox.checked;
    clicked = true;
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
                inputEmail.value = "";
                inputName.value = "";
                inputMessage.value = "";
                inputCheckbox.checked = false;
            }
            } else {
              query();
              inputEmail.value = "";
              inputName.value = "";
              inputMessage.value = "";
            }

});

const query = async () => {

    let response = await fetch('https://jsonplaceholder.typicode.com/', {
      method: 'POST',
      body: new FormData(form)
    });

    let result = await response.json();
    alert(result.message);
}