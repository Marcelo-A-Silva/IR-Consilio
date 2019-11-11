/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const port = 8081; // porta padrão
// eslint-disable-next-line import/no-unresolved
const mysql = require('mysql');

require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);
app.listen(port);
// eslint-disable-next-line no-console
console.log('API funcionando!');
