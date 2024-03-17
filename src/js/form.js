/**
 * Created by AndreyBan
 * in PhpStorm
 * 17.03.2024
 **/
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})
