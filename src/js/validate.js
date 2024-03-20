/**
 * Created by AndreyBan
 * in PhpStorm
 * 18.03.2024
 **/

(() => {
    const fields = {
        name: 'name',
        email: 'email',
        phone: 'phone',
        password: 'password',
        passwordAccept: 'password-accept',
        INN: 'INN',
        KPP: 'KPP',
        OGRN: 'OGRN',
        subscribe: 'subscribe',
        nameOrganization: 'nameOrganization',
        privacy: 'privacy'
    }

    const errorMessages = {
        ERROR_REQUIRED: 'Обязательное поле',
        ERROR_EMAIL: 'Введите корректный email',
        ERROR_PHONE: 'Заполните телефон полностью',
        ERROR_MIN_LENGTH: (minLength) => {
            return `Поле должно содержать не менее ${ minLength } символов`
        },
        ERROR_MIN_LENGTH_DATA: (minLength, fieldName) => {
            return `${ fieldName } должно состоять из ${ minLength } символов`
        }
    }

    const errors = {
        [fields.name]: {
            valueMissing: errorMessages.ERROR_REQUIRED
        },
        [fields.email]: {
            valueMissing: errorMessages.ERROR_REQUIRED,
            typeMismatch: errorMessages.ERROR_EMAIL,
            customError: errorMessages.ERROR_EMAIL
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
            valueMissing: errorMessages.ERROR_REQUIRED,
            tooShort: errorMessages.ERROR_MIN_LENGTH_DATA(12, 'ИНН')
        },
        [fields.KPP]: {
            valueMissing: errorMessages.ERROR_REQUIRED,
            tooShort: errorMessages.ERROR_MIN_LENGTH_DATA(9, 'КПП')
        },
        [fields.OGRN]: {
            valueMissing: errorMessages.ERROR_REQUIRED,
            tooShort: errorMessages.ERROR_MIN_LENGTH_DATA(13, 'ОГРН')
        },
        [fields.nameOrganization]: {
            valueMissing: errorMessages.ERROR_REQUIRED,
        },
        [fields.passwordAccept]: {
            valueMissing: errorMessages.ERROR_REQUIRED,
            tooShort: errorMessages.ERROR_MIN_LENGTH(6)
        },
        // [fields.subscribe]: {
        //     valueMissing: errorMessages.ERROR_REQUIRED
        // },
        // [fields.privacy]: {
        //     valueMissing: errorMessages.ERROR_REQUIRED
        // }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const forms = document.querySelectorAll('.js-form')

        forms?.forEach(el => formValidate(el))

        checkFillInput()
        initMasks()

        const inputs = document.querySelectorAll('.form-input input')

        inputs.forEach(el => {
            el.addEventListener('input', () => validateInput(el))
        })
    })

    function initMasks() {
        const phone = document.querySelector(`input[name=${ fields.phone }]`);
        const kpp = document.querySelector(`input[name=${ fields.KPP }]`);
        const ogrn = document.querySelector(`input[name=${ fields.OGRN }]`);

        if (phone) {
            IMask(phone, {
                mask: '+7(000)000-00-00',
                prepare: (val, masked) => !masked.value && val === '8' ? "+7" : val
            });
        }

        if (kpp) {
            IMask(kpp, { mask: '000000000' })
        }

        if (ogrn) {
            IMask(ogrn, { mask: /^[15]\d{0,12}$/ })
        }

        setMaskINN()
    }

    function setMaskINN() {
        const inn = document.querySelector(`input[name=${ fields.INN }]`);

        if (inn) {
            const legalFrom = document.querySelectorAll(`[name=legal-form]`)

            const lengthINN = {
                count: 12,
                mask: '000000000000'
            }

            const maskINN = IMask(inn, { mask: lengthINN.mask })

            inn.setAttribute('minlength', lengthINN.count)

            legalFrom.forEach(el => {
                el.addEventListener('change', () => {
                    const isIndividual = el.value === 'type-1'

                    lengthINN.mask = isIndividual ? '000000000000' : '0000000000'
                    lengthINN.count = isIndividual ? 12 : 10
                    inn.setAttribute('minlength', lengthINN.count)
                    maskINN.mask = lengthINN.mask
                    errors[fields.INN].tooShort = errorMessages.ERROR_MIN_LENGTH_DATA(lengthINN.count, 'ИНН')
                    maskINN.value = ''
                })
            })
        }
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
     */
    function formValidate(el) {
        el.addEventListener('submit', e => {
            e.preventDefault()

            // const mainFields = el.querySelector('[name=main-fields]')
            checkValidationInput(el)
            if (el.checkValidity()) {
                console.log('send')
            } else {
                el.classList.add('was-validated')
            }
        }, false)

    }

    function checkValidationInput(context) {
        for (const i of context.elements) {
            validateInput(i)
        }
    }

    function validateInput(input) {
        const nameField = input.getAttribute('name')
        const isNeedValidate = Object.keys(errors).includes(nameField)

        if (isNeedValidate) {
            customErrors(input, nameField)

            Object.keys(ValidityState.prototype).forEach((key) => {
                if (input.validity[key]) {
                    const parent = input.closest('.form-input')
                    // const parent = input.closest(input.type === 'checkbox' ? '.form-check' : '.form-input')

                    if (!parent.querySelector('.invalid-feedback')) {
                        parent.insertAdjacentHTML('beforeend', '<div class="invalid-feedback"></div>')
                    }

                    const error = parent.querySelector('.invalid-feedback')

                    error.textContent = errors[input.name][key]
                }
            })
        }
    }

    function customErrors(input, nameField) {
        // Костыль для обхода подстановки значения маски при первом вводе символа
        if (nameField === fields.phone) {
            const isCorrectPhone = !input.validity.valueMissing && input.value.length < 16

            input.setCustomValidity(isCorrectPhone ? 'Incorrect phone' : '');
        } else if (nameField === fields.email) {
            const isCorrectEmail = !input.validity.valueMissing && !input.value.includes('.')

            input.setCustomValidity(isCorrectEmail ? 'Incorrect email' : '');
        }
    }
})()
