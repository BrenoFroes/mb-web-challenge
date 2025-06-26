import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.post('/registration', express.json(), (req, res) => {
    let expectedFields = ['email', 'isLegalPerson', 'password'];
    let payload = {
        email: req.body.email,
        isLegalPerson: req.body.isLegalPerson,
        password: req.body.password,
    };
    if (payload.isLegalPerson) {
        expectedFields = [...expectedFields, 'companyName', 'cnpj', 'foundingDate', 'companyPhone'];
        payload = {
            ...payload,
            companyName: req.body.companyName,
            cnpj: req.body.cnpj,
            foundingDate: req.body.foundingDate,
            phone: req.body.companyPhone,
        }
    } else {
        expectedFields = [...expectedFields, 'name', 'cpf', 'birthDate', 'phone'];
        payload = {
            ...payload,
            name: req.body.name,
            cpf: req.body.cpf,
            birthDate: req.body.birthDate,
            phone: req.body.phone,
        }
    }
    if (!expectedFields.every(field => field in req.body)) {
        return res.status(400).json({ error: `Todos os campos são obrigatórios para pessoa ${payload.isLegalPerson ? 'jurídica.' : 'física'}` });
    }
    const sentFields = Object.keys(req.body);
    const hasExtraFields = sentFields.filter(field => !expectedFields.includes(field));
    if (hasExtraFields.length > 0) {
        return res.status(400).json({ error: 'Campos extras foram enviados.' });
    }
    res.status(200).json({ message: 'Usuário registrado com sucesso!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});