/* eslint-disable no-shadow */
const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const Login = require('../model/Login');
const utils = require('../../utils/utils');

const router = express.Router();
router.post('/', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'Teste',
		nome: 'nome',
	};
	const { nome, senha } = req.body;
	const nomeP = nome.toLowerCase();
	// eslint-disable-next-line camelcase
	Login.loginUser(nomeP, utils.encode64(senha), (status, errorMessage, total, result, nome) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
			nome,
		};
		res.send(response);
	});
});

router.get('/checktoken', (req, res) => {
	const { token } = req.headers;
	const secret = 'helpdesk';
	let jwtDate = '';
	let actualDate = '';

	Login.validToken(token, (status, errorMessage, result) => {
		if (status) {
			res.status(401).send({ error: true, message: 'Usuário sem acesso para está area' });
			return;
		}
		if (result <= 0) {
			res.status(401).send({ error: true, message: 'Usuário sem acesso para está area' });
			return;
		}
		jwt.verify(token, secret, (err, decoded) => {
			if (err) {
				res.status(401).send({ error: true, message: 'Usuário sem acesso para está area' });
				return;
			}
			jwtDate = moment.unix(decoded.iat).format('YYYYMMDD');
			actualDate = moment().format('YYYYMMDD');
			if (jwtDate < actualDate) {
				res.status(401).send({ error: true, message: 'Usuário sem acesso para está area' });
				return;
			}
			res.send({ error: false, message: '', result: decoded });
		});
	});
});
module.exports = router;
