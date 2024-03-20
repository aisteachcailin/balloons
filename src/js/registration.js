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
            })
        })
    }
})()
