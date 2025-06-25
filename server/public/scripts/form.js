import { validateEmail, validateName, validateCPF, validateBirth, validatePhone, validateCNPJ, validateCompanyName, 
    validateFoundingDate, setupValidation } from "./validation.js";

window.document.addEventListener('DOMContentLoaded', () => {
    // etapa 1 validacoes iniciais
    setupValidation('mbEmailInput', 'mbErrorEmailInput', validateEmail);

    const physicalRadio = document.getElementById('mbPhysicalPerson');
    const legalRadio = document.getElementById('mbLegalPerson');
    physicalRadio.addEventListener('change', () => {
        legalRadio.checked = false;
        document.cookie = 'mbPersonType=physical; path=/';
    });
    legalRadio.addEventListener('change', () => {
        physicalRadio.checked = false;
        document.cookie = 'mbPersonType=legal; path=/';
    });

    // etapa 2 validacoes pf
    setupValidation('mbNameInput', 'mbErrorNameInput', validateName);
    setupValidation('mbCpfInput', 'mbErrorCpfInput', validateCPF);
    setupValidation('mbBirthInput', 'mbErrorBirthInput', validateBirth);

    // etapa 2 validacoes pj
    setupValidation('mbCompanyNameInput', 'mbErrorCompanyNameInput', validateCompanyName);
    setupValidation('mbCnpjInput', 'mbErrorCnpjInput', validateCNPJ);
    setupValidation('mbFoundingDateInput', 'mbErrorFoundingDateInput', validateFoundingDate);
    setupValidation('mbPhoneInput', 'mbErrorPhoneInput', validatePhone);
});
