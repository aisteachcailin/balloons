/**
 * Created by AndreyBan
 * in PhpStorm
 * 18.03.2024
 **/
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const forms = document.querySelectorAll('.js-form')
        const errorMessages = {
            ERROR_REQUIRED: 'Обязательное поле',
            ERROR_EMAIL: 'Введите корректный email',
            ERROR_PHONE: 'Заполните телефон полностью',
            ERROR_MIN_LENGTH: (minLength) => {
                return `Поле должно содержать не менее ${ minLength } символов`
            },
            ERROR_MIN_LENGTH_INN: (minLength) => {
                return `ИНН должно состоять из ${ minLength } символов`
            }
        }

        const fields = {
            name: 'name',
            email: 'email',
            phone: 'phone',
            password: 'password',
            INN: 'INN',
            KPP: 'KPP',
            OGRN: 'OGRN'
        }



        const errors = {
            [fields.name]: {
                valueMissing: errorMessages.ERROR_REQUIRED
            },
            [fields.email]: {
                valueMissing: errorMessages.ERROR_REQUIRED,
                typeMismatch: errorMessages.ERROR_EMAIL,
            },
            [fields.phone]: {
                valueMissing: errorMessages.ERROR_REQUIRED,
                customError: errorMessages.ERROR_PHONE
            },
            [fields.password]: {
                valueMissing: errorMessages.ERROR_REQUIRED,
                tooShort: errorMessages.ERROR_MIN_LENGTH(6)
            },
            [fields.INN]: {
                tooShort: errorMessages.ERROR_MIN_LENGTH_INN(12)
            },
            [fields.KPP]: {
                tooShort: errorMessages.ERROR_MIN_LENGTH_INN(9)
            },
            [fields.OGRN]: {
                tooShort: errorMessages.ERROR_MIN_LENGTH_INN(13)
            }
        }

        forms?.forEach(el => {
            formValidate(el, errors)
        })

        checkFillInput()
        initMasks()

        const inputs = document.querySelectorAll('.form-input input')

        inputs.forEach(el => {
            el.addEventListener('input', () => validateInput(el, errors))
        })
    })

    function initMasks() {
        const phone = document.querySelector('input[name=phone]');
        const inn = document.querySelector('input[name=INN]');
        const ogrn = document.querySelector('input[name=OGRN]');
        const kpp = document.querySelector('input[name=KPP]');

        IMask(phone, {
            mask: '+7(000)000-00-00',
            prepare: (val, masked) => !masked.value && val === '8' ? "+7" : val
        });

        IMask(inn, {
            mask: '000000000000'
        })
        IMask(ogrn, {
            mask: '0000000000000'
        })
        IMask(kpp, {
            mask: '000000000'
        })
    }
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
     * @param errors
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

    function checkValidationInput(context, errors) {
        for (const i of context.elements) {
            validateInput(i, errors)
        }
    }

    function validateInput(input, errors) {
        // Костыль для обхода подстановки значения маски при первом вводе символа
        if (input.getAttribute('name') === 'phone') {
            const isCorrect = !input.validity.valueMissing && input.value.length < 16
            input.setCustomValidity(isCorrect ? 'Incorrect phone' : '');
        }

        Object.keys(ValidityState.prototype).forEach((key) => {
            if (input?.validity[key]) {
                input.closest('.form-input')
                    .querySelector('.invalid-feedback')
                    .textContent = errors[input.name][key]
            }
        })
    }
})()
