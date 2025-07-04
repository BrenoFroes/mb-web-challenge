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

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(name)) {
        return {
            valid: false,
            errorMessage: 'O nome deve conter apenas letras.'
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

const validateBirth = (birth) => {
    if (ignoreValidation(birth)) {
        return { valid: true, errorMessage: '' };
    }
    const date = new Date(birth);
    if (isNaN(date.getTime())) {
        return { valid: false, errorMessage: 'Data inválida.' };
    }
    const today = new Date();
    const minimumYear = 1900;
    const age = today.getFullYear() - date.getFullYear();
    
    if (date.getFullYear() < minimumYear) {
        return { valid: false, errorMessage: `O ano de nascimento não pode ser anterior a ${minimumYear}.` };
    }
    if (age < 18) {
        return { valid: false, errorMessage: 'Você tem que ter pelo menos 18 anos.' };
    }
    if (date > today) {
        return { valid: false, errorMessage: 'Data de nascimento não pode ser futura.' };
    }
    return { valid: true, errorMessage: '' };
};

const validatePhone = (phone) => {
    if (ignoreValidation(phone)) {
        return { valid: true, errorMessage: '' };
    }
    const cleanPhone = phone.replace(/\D/g, '');
    const isValid = /^(\d{2})(9\d{8}|\d{8})$/.test(cleanPhone);
    if (!isValid) {
        return { valid: false, errorMessage: 'Telefone inválido.' };
    }
    return { valid: true, errorMessage: '' };
};

const validateCNPJ = (cnpj) => {
    if (ignoreValidation(cnpj)) {
        return { valid: true, errorMessage: '' };
    }
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length !== 14) {
        return { valid: false, errorMessage: 'CNPJ deve conter 14 digitos' };
    }

    let size = cleanCNPJ.length - 2;
    let numbers = cleanCNPJ.substring(0, size);
    let digits = cleanCNPJ.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0)) {
        return { valid: false, errorMessage: 'CNPJ invalido.' };
    }

    size = size + 1;
    numbers = cleanCNPJ.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
        sum += numbers.charAt(size - i) * pos--;
        if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1)) {
        return { valid: false, errorMessage: 'CNPJ inválido' };
    }

    return { valid: true, errorMessage: '' };
};

const validateCompanyName = (companyName) => {
    if (ignoreValidation(companyName)) {
        return { valid: true, errorMessage: '' };
    }
    if (companyName.length < 3) {
        return { valid: false, errorMessage: 'Razão social deve ter pelo menos 3 caracter.' };
    }
    return { valid: true, errorMessage: '' };
};

const validateFoundingDate = (foundingDate) => {
    if (ignoreValidation(foundingDate)) {
        return { valid: true, errorMessage: '' };
    }
    const date = new Date(foundingDate);
    if (isNaN(date.getTime())) {
        return { valid: false, errorMessage: 'Data inválida' };
    }
    const today = new Date();
    const minimumYear = 1800;
    
    if (date > today) {
        return { valid: false, errorMessage: 'Data de abertura não pode ser uma futura.' };
    }
    if (date.getFullYear() < minimumYear) {
        return { valid: false, errorMessage: `O ano de abertura não pode ser anterior a ${minimumYear}.` };
    }
    return { valid: true, errorMessage: '' };
};

const validatePassword = (password) => {
    if (ignoreValidation(password)) {
        return { valid: true, errorMessage: '' };
    }
    const hasMinLength = password.length >= 12;

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (!hasMinLength) {
        return { valid: false, errorMessage: 'A senha deve ter pelo menos 12 caracteres.'}
    }
    if (!hasUpperCase) {
        return { valid: false, errorMessage: 'A senha deve conter pelo menos uma letra maiúscula.'}
    }
    if (!hasSpecialChar) {
        return { valid: false,errorMessage: 'A senha deve conter pelo menos um caractere especial.'}
    }
    if (!hasLowerCase) {
        return { valid: false, errorMessage: 'A senha deve conter pelo menos uma letra minúscula.' };
    }
    if (!hasNumber) {
        return { valid: false, errorMessage: 'A senha deve conter pelo menos um número.' };
    }
    return { valid: true, errorMessage: '' };
};


export { validateEmail, validateName, validateCPF, validateBirth, validatePhone, validateCNPJ, validateCompanyName, validateFoundingDate, validatePassword };

