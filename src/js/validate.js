/**
 * Created by AndreyBan
 * in PhpStorm
 * 18.03.2024
 **/
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.js-form')

    forms.forEach(el => formValidate(el))

})

/**
 * Валидация формы
 * @param el
 */
function formValidate (el) {
    el.addEventListener('submit', e => {
        e.preventDefault()
        el.classList.remove('was-validated')
        const mainFields = el.querySelector('[name=main-fields]')
        const fields = []


        for (const i of mainFields.elements) {
            // fields.push({name: i.name, value: i.value})
            if (i.name === 'name') {
                if (i.value === '1') {
                    i.setCustomValidity('Низя')
                } else {
                    i.setCustomValidity('')
                }
            }
        }
        console.log(el.checkValidity())

        // if (!el.checkValidity()) {
        //     e.preventDefault()
        //     e.stopPropagation()
        // }

        el.classList.add('was-validated')
    }, false)

}
