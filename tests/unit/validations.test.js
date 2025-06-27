import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword } from '@/assets/utils/validations.js'

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org'
      ]
      
      validEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate incorrect email addresses', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user name@domain.com'
      ]
      
      invalidEmails.forEach(email => {
        const result = validateEmail(email)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
    
    it('should handle empty email', () => {
      const result = validateEmail('')
      expect(result.valid).toBe(false)
      expect(result.errorMessage).toBeTruthy()
    })
  })
  
  describe('validatePassword', () => {
    it('should validate strong passwords', () => {
      const validPasswords = [
        'StrongPass123!',
        'MySecure@Password1',
        'Test123@Pass'
      ]
      
      validPasswords.forEach(password => {
        const result = validatePassword(password)
        expect(result.valid).toBe(true)
        expect(result.errorMessage).toBe('')
      })
    })
    
    it('should invalidate weak passwords', () => {
      const invalidPasswords = [
        'weak',
        '123456',
        'password',
        ''
      ]
      
      invalidPasswords.forEach(password => {
        const result = validatePassword(password)
        expect(result.valid).toBe(false)
        expect(result.errorMessage).toBeTruthy()
      })
    })
  })
})
