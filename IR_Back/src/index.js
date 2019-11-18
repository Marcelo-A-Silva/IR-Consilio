/* eslint-disable */
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const router = express.Router();

// const port = 8081; // porta padrão
// // eslint-disable-next-line import/no-unresolved
// const mysql = require('mysql');

// require('dotenv/config');

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
// app.use('/', router);
// app.listen(port);
// // eslint-disable-next-line no-console
// console.log('Funcionando!');
// console.log('Funcionando!');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
require('dotenv/config');

const app = express();
app.set('port', (process.env.PORT || 8081));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);
app.listen(app.get('port'), () => {
	console.log('');
	console.log('|*********************|');
	console.log('| SERVIÇO EM EXECUÇÃO |');
	console.log('|_____________________|');
	console.log('');
});