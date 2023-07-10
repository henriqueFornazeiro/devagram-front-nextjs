const validateName = (name) => {
    return name?.toString().length > 2;
}

const validateEmail = (email) => {
    const emailStr = email?.toString();    
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validatePass = (pass) => {
    return pass?.toString().length > 3;
}

const validateConfirmPass = (pass, confirm) => {
    return validatePass(pass) && pass === confirm;
}

export {
    validateName,
    validateEmail,
    validatePass,
    validateConfirmPass
}