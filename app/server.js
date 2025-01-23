/*COLETA DE DADOS DE FORMULARIOS */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Biblioteca CORS

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.static(path.join(__dirname, '../pages')));

// Caminho para o arquivo data.json
const dataFilePath = path.join(__dirname, 'data.json');

// Rota POST para salvar os contatos
app.post('/contacts', (req, res) => {
    const { email, whatsapp, subject, message } = req.body;

    if (!email || !whatsapp || !message) {
        return res.status(400).json({ error: 'Campos obrigatórios faltando!' });
    }

    const newContact = {
        email,
        whatsapp,
        subject,
        message,
        date: new Date().toISOString(),
    };

    // Lê o arquivo JSON existente
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).json({ error: 'Erro no servidor.' });
        }

        let contacts = [];
        if (data) {
            try {
                contacts = JSON.parse(data);
            } catch (parseError) {
                console.error('Erro ao analisar JSON:', parseError);
                return res.status(500).json({ error: 'Erro no servidor.' });
            }
        }

        // Adiciona o novo contato e salva o arquivo atualizado
        contacts.push(newContact);
        fs.writeFile(dataFilePath, JSON.stringify(contacts, null, 2), 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Erro ao escrever no arquivo:', writeErr);
                return res.status(500).json({ error: 'Erro no servidor.' });
            }

            res.status(201).json({ message: 'Contato salvo com sucesso!' });
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
