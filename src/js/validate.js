/**
 * Created by AndreyBan
 * in PhpStorm
 * 18.03.2024
 **/
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.js-form')
    const errorMessages = {
        ERROR_REQUIRED: 'Обязательное поле',
        ERROR_EMAIL: 'Введите корректный email',
        ERROR_MIN_LENGTH: (minLength) => {
            return `Поле должно содержать не менее ${minLength} символов`
        }
    }
    const errors = {
        name: {
            valueMissing: errorMessages.ERROR_REQUIRED
        },
        email: {
            valueMissing: errorMessages.ERROR_REQUIRED,
            typeMismatch: errorMessages.ERROR_EMAIL,
        },
        phone: {
            valueMissing: errorMessages.ERROR_REQUIRED,
        },
        password: {
            valueMissing: errorMessages.ERROR_REQUIRED,
            tooShort: errorMessages.ERROR_MIN_LENGTH(6)
        } 
    }

    forms.forEach(el => {
        formValidate(el, errors)
    })

    checkFillInput()

    const inputs = document.querySelectorAll('.form-input input')
    
    inputs.forEach(el => {
        el.addEventListener('input', () => validateInput(el, errors))
    })
})

/**
 * Проверяем заполненность поля для фиксации label над полем
 */
function checkFillInput() {
    const inputs = document.querySelectorAll('.form-input input')

    inputs.forEach(el => {
        el.addEventListener('change', () => {
            el.closest('.form-input')
                .classList
                .toggle('fill', el.value.length)
        })
    })
}

/**
 * Валидация формы
 * @param el
 */
function formValidate(el, errors) {
    el.addEventListener('submit', e => {
        e.preventDefault()
        
        el.classList.remove('was-validated')
        const mainFields = el.querySelector('[name=main-fields]')
        checkValidationInput(mainFields, errors)
        // if (!el.checkValidity()) {
        //     e.preventDefault()
        //     e.stopPropagation()
        // }

        el.classList.add('was-validated')
    }, false)

}

function checkValidationInput (context, errors) {
    for (const i of context.elements) {
        validateInput(i, errors)
    }
}

function validateInput(input, errors) {
    ['valueMissing', 'tooShort', 'typeMismatch'].forEach((key) => {
        if (input.validity[key]) {
            input.closest('.form-input')
            .querySelector('.invalid-feedback')
            .textContent = errors[input.name][key]
        }
    })
}