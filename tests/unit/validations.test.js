import { describe, it, expect } from 'vitest'
import { 
  validateEmail, 
  validatePassword, 
  validateName, 
  validateCPF, 
  validateBirth, 
  validatePhone, 
  validateCNPJ, 
  validateCompanyName, 
  validateFoundingDate 
} from '@/assets/utils/validations.js'

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email adresses', () => {
      const validEmails = [
        'bfroes58@gmail.com',
        'breno.froes@empresa.com.br',
        'contato@brenofroes.dev'
      ]
      
      validEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate incorect email addresses', () => {
      const invalidEmails = [
        'breno-sem-arroba',
        '@gmail.com',
        'breno@',
        'breno froes@gmail.com'
      ]
      
      invalidEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
    
    it('should handle empty email', () => {
      const result = validateEmail('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })
  
  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const validPasswords = [
        'MinhaSenh@123!',
        'Breno2025@Password',
        'MegaSecur@Pass99'
      ]
      
      validPasswords.forEach(password => {
        const result = validatePassword(password)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate weak passwords', () => {
      const invalidPasswords = [
        'fraca',
        '123456',
        'senha',
      ]
      
      invalidPasswords.forEach(password => {
        const result = validatePassword(password)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
  })

  describe('validateName', () => {
    it('should validate complete names', () => {
      const validNames = [
        'Breno Froes',
        'Maria Silva Santos',
        'Carlos Eduardo',
        'Ana Beatriz Oliveira'
      ]
      
      validNames.forEach(name => {
        const result = validateName(name)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate incomplet names', () => {
      const invalidNames = [
        'Breno',
        'João123',
        'Maria@Silva',
        'Pedro_Santos'
      ]
      
      invalidNames.forEach(name => {
        const result = validateName(name)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
    
    it('should handle empty name', () => {
      const result = validateName('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })

  describe('validateCPF', () => {
    it('should validate correct CPF numbers', () => {
      const validCPFs = [
        '11144477735',
        '111.444.777-35'
      ]
      
      validCPFs.forEach(cpf => {
        const result = validateCPF(cpf)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate incorrect CPF numbers', () => {
      const invalidCPFs = [
        '12345678901',
        '999.999.999-91',
        '123456789',
        'abcdefghijk'
      ]
      
      invalidCPFs.forEach(cpf => {
        const result = validateCPF(cpf)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
    
    it('should handle empty CPF', () => {
      const result = validateCPF('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })

  describe('validateBirth', () => {
    it('should validate correct birth dates', () => {
      const validDates = [
        '1999-01-29',
        '1985-12-25',
        '2000-06-15'
      ]
      
      validDates.forEach(date => {
        const result = validateBirth(date)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate future dates', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const result = validateBirth(futureDate.toISOString().split('T')[0])
      expect(result.valid).toBe(false)
      expect(result.errorMessage).toContain('18')
    })
    
    it('should invalidate dates for minors', () => {
      const minorDate = new Date()
      minorDate.setFullYear(minorDate.getFullYear() - 16)
      const result = validateBirth(minorDate.toISOString().split('T')[0])
      expect(result.valid).toBe(false)
      expect(result.errorMessage).toContain('18 anos')
    })
    
    it('should handle empty birth date', () => {
      const result = validateBirth('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })

  describe('validatePhone', () => {
    it('should validate correct phone numbers', () => {
      const validPhones = [
        '(11) 99887-7665',
        '11998877665',
        '(11) 3344-5566',
        '1133445566'
      ]
      
      validPhones.forEach(phone => {
        const result = validatePhone(phone)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate incorect phone numbers', () => {
      const invalidPhones = [
        '123',
        '11111',
        '(11) 1111-1111',
        'telefone123',
        '1872111',
        '12981231',
        '1231211112312212'
      ]
      
      invalidPhones.forEach(phone => {
        const result = validatePhone(phone)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
    
    it('should handle empty phone', () => {
      const result = validatePhone('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })

  describe('validateCNPJ', () => {
    it('should validate correct CNPJ numbers', () => {
      const validCNPJs = [
        '11222333000181',
        '11.222.333/0001-81'
      ]
      
      validCNPJs.forEach(cnpj => {
        const result = validateCNPJ(cnpj)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate incorrect CNPJ numbers', () => {
      const invalidCNPJs = [
        '12345678901234',
        '99.999.999/9999-99',
        '123456789',
        'empresa1234567'
      ]
      
      invalidCNPJs.forEach(cnpj => {
        const result = validateCNPJ(cnpj)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
    
    it('should handle empty CNPJ', () => {
      const result = validateCNPJ('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })

  describe('validateCompanyName', () => {
    it('should validate correct company names', () => {
      const validNames = [
        'Froes Tech LTDA',
        'Breno Desenvolvimento S.A.',
        'DevCorp Soluções',
        'TechBF Serviços'
      ]
      
      validNames.forEach(name => {
        const result = validateCompanyName(name)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate short company names', () => {
      const invalidNames = [
        'BF',
        'X',
      ]
      
      invalidNames.forEach(name => {
        const result = validateCompanyName(name)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
    
    it('should handle empty company name', () => {
      const result = validateCompanyName('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })

  describe('validateFoundingDate', () => {
    it('should validate correct founding dates', () => {
      const validDates = [
        '2020-03-15',
        '1999-01-29',
        '2015-12-31'
      ]
      
      validDates.forEach(date => {
        const result = validateFoundingDate(date)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate future dates', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      const result = validateFoundingDate(futureDate.toISOString().split('T')[0])
      expect(result.valid).toBe(false)
      expect(result.errorMessage).toContain('futura')
    })
    
    it('should invalidate very old dates', () => {
      const result = validateFoundingDate('1700-01-01')
      expect(result.valid).toBe(false)
      expect(result.errorMessage).toContain('1800')
    })
    
    it('should handle empty founding date', () => {
      const result = validateFoundingDate('')
      expect(result.valid).toBe(true)
      expect(result.errorMessage).toBe('')
    })
  })
})
