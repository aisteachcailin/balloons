/**
 * Created by AndreyBan
 * in PhpStorm
 * 18.03.2024
 **/

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        displayTypeForm()
    })

    /**
     * Отображаем нужный вид формы
     */
    function displayTypeForm() {
        const typeForm = document.querySelector('.js-type-form')
        const radioTypeForm = typeForm.querySelectorAll('input[type=radio]')


        radioTypeForm.forEach(el => {
            el.addEventListener('change', () => {
                const valueTypeForm = typeForm.querySelector('input[type=radio]:checked').value

                typeForm.setAttribute('data-form-type', valueTypeForm)

                const fieldsRequiredObj = {
                    add: ['INN', 'contact-person'],
                    remove: ['name']
                }
                if (valueTypeForm === 'type-1') {
                    fieldsRequiredObj.add = ['name']
                    fieldsRequiredObj.remove = ['INN', 'contact-person']
                }

                fieldsRequired(fieldsRequiredObj.add, fieldsRequiredObj.remove)

                const form = el.closest('.js-form')

                form.querySelectorAll('.was-validated').forEach(item => {
                    item.classList.remove('was-validated')
                })
            })
        })
    }

    function fieldsRequired(setRequiredFields, removeRequiredFields) {
        removeRequiredFields.forEach(el => {
            const field = document.querySelector(`[name=${ el }]`)

            field.removeAttribute('required')
            field.closest('.form-input').classList.remove('fill')
            field.value = ''
        })

        setRequiredFields.forEach(el => {
            document.querySelector(`[name=${ el }]`).setAttribute('required', 'required')
        })
    }
})()
