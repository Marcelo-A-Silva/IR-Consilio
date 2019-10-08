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
