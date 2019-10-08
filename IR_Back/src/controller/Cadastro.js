/* eslint-disable no-shadow */
const express = require('express');
const Cadastro = require('../model/Cadastro');

const router = express.Router();
const utils = require('../../utils/utils');

router.post('/', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'TESTE',
	};
	const {
		nome, sobrenome, email, sexo, usuario, senha, telefone,
	} = req.body;
	const usuarioP = usuario.toLowerCase();

	Cadastro.verificaUser(usuarioP, email, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		if (status) {
			res.send(response);
			return;
		}
		Cadastro.cadastroUser(nome, sobrenome, email, sexo, usuarioP, utils.encode64(senha), telefone, (status, errorMessage, total, result) => {
			response = {
				error: status,
				message: errorMessage,
				total_records: total,
				data: result,
			};
			res.send(response);
		});
	});
});
router.post('/updateTechnical', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: '',
	};
	const params = req.body;
	Cadastro.updateTechnical(params, (status, errorMessage, total, result) => {
		response = {
			erro: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
module.exports = router;
