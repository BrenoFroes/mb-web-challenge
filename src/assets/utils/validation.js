const ignoreValidation = (field) => {
    return !field || field.trim() === '';
}

const validateEmail = (email) => {
    if (ignoreValidation(email)) {
        return {
            valid: true,
            errorMessage: ''
        }
    }

    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (email.length < 5 || email.length > 50) {
        return {
            valid: false,
            errorMessage: 'O e-mail deve ter entre 5 e 50 caracteres.'
        }
    }
    if (!isValidFormat) {
        return {
            valid: false,
            errorMessage: 'Formato de e-mail inválido.'
        }
    }
    return {
        valid: true,
        errorMessage: ''
    }
};

const validateName = (name) => {
    if (ignoreValidation(name)) {
        return {
            valid: true,
            errorMessage: ''
        }
    }
    if (name.split(' ').length < 2) {
        return {
            valid: false,
            errorMessage: 'Digite o nome completo (nome e sobrenome).'
        }   
    }
    return {
        valid: true,
        errorMessage: ''
    }
};

const validateCPF = (cpf) => {
    if (ignoreValidation(cpf)) {
        return {
            valid: true,
            errorMessage: ''
        }
    }

    const cleanCPF = cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) {
        return {
            valid: false,
            errorMessage: 'CPF deve conter 11 dígitos.'
        }
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
        return {
            valid: false,
            errorMessage: 'CPF inválido.'
        }
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
        return {
            valid: false,
            errorMessage: 'CPF inválido.'
        }
    }

    return {
        valid: true,
        errorMessage: ''
    }
};

export { validateEmail, validateName, validateCPF };
