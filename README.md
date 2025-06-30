# Mercado Bitcoin - Sistema de registro

Sistema simples de cadastro feito com Vue 3 + Vite.

## O que é

Um formulário de cadastro dividido em etapas para registrar pessoas físicas e empresas. 

Basicamente você coloca o email, escolhe se é pessoa física ou empresa correspondentes, preenche os dados, define uma senha e pronto.
Desafio como basse: https://github.com/mercadobitcoin/desafio-mb-web

## O que tem

- Cadastro em etapas (mais fácil de usar)
- Formulário para pessoa física (nome, cpf, data de nascimento e telefone)
- Formulário para empresa (cnpj, razão social, data de fundacao e telefone) 
- Validação dos campos em tempo real
- Interface somente mobile
- Você pode revisar os dados antes de enviar
- Componentes organizados (atomic design)
- CSS organizado com BEM

## Stack

**Front:**
- Vue 3 
- Vite 
- SCSS 
- ESLint 

**Back:**
- Express 
- CORS

## Como usar

Precisa ter Node.js instalado (uso a versão 22).

```bash
git clone <url-do-repo>
npm install
```

Depois para rodar:
```bash
# front
npm run build

# back (outro terminal)
node server/index.js

Dai acessar:
- http://localhost:3000
```

## Comandos úteis

```bash
npm run dev          # roda o front
npm run build        # gera build pra produção
npm run lint         # verifica o código
npm run lint:fix     # corrige o que conseguir automaticamente
```


Caso deseje rodar somente o front:
```bash
# front
npm run dev

Dai acessar:
- http://localhost:5173 (front)
```

## API Endpoints

### POST `/registration`

Endpoint para cadastro de usuários.

**Pessoa Física:**
```json
{
  "email": "breno@froes.com",
  "isLegalPerson": false,
  "password": "senha123",
  "name": "Breno Froes",
  "cpf": "12345678900",
  "birthDate": "1990-01-01",
  "phone": "11999999999"
}
```

**Pessoa Jurídica:**
```json
{
  "email": "brenoltda@froes.com",
  "isLegalPerson": true,
  "password": "senha123",
  "companyName": "Breno LTDA",
  "cnpj": "12345678000100",
  "foundingDate": "2010-01-01",
  "companyPhone": "1133333333"
}
```

### GET `/registration`

Endpoint para recuperar aplicação front-end buildada.
