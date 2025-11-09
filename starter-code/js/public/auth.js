
const emailInputs = document.querySelectorAll('.type-email')
const passwordInputs = document.querySelectorAll('.type-password')

const bothPasswords = document.querySelectorAll('.password-validate')
const createdPassword = document.querySelector('#register-password')
const confirmPassword = document.querySelector('#confirm-password')


const createAccBtn = document.querySelector('.form-button .register')

const inputError = document.querySelectorAll('.input-error.email')

const inputErrorPassword = document.querySelectorAll('.input-error.password')

const isEmpty = function (str, errorDisplay, elm) {
    
    if (!str.trim().length) {
        errorDisplay[0].style.display = 'block'
        errorDisplay[1].style.display = 'block'
        elm[0].style.border = '1px solid red'
        elm[1].style.border = '1px solid red'
    } else {
        errorDisplay[0].style.display = 'none'
        errorDisplay[1].style.display = 'none'
        elm[0].style.border = '1px solid rgb(217, 217, 217);'
        elm[1].style.border = '1px solid rgb(217, 217, 217);'
           
        }
    
}

emailInputs.forEach((elm, index) => {
    elm.addEventListener('input', (e) => {
        
        isEmpty(elm.value,inputError,emailInputs)
    })
})

passwordInputs.forEach((elm, index) => {
    elm.addEventListener('input', (e) => {
        isEmpty(elm.value,inputErrorPassword,passwordInputs)

    })
})

//Ensure passwords match

bothPasswords.forEach((elm, index) => {
    elm.addEventListener('change', () => {
        
        if (confirmPassword.value === createdPassword.value) {
            confirmPassword.setCustomValidity('');
        } else if(confirmPassword.value != createdPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        }
    })
})
