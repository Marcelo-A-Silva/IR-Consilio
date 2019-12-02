/* eslint-disable */
const express = require('express');
const Carteira = require('../model/Carteira');
const utils = require('../../utils/utils');

const router = express.Router();

// Inserts

router.post('/addCompra', (req, res) => {
	let response = {
		error: false,
		message: '',
		total: 1,
		result: 'Tudo ok',
	};
	const { select }				= req.body;
	const { quant }					= req.body;
	const { valor }			= req.body;
	const { token } 					= req.headers;
	const { User } 						= utils.decoteJwt(token);
	Carteira.addCompra(select, quant, valor, User, (status, errorMessage, total, result) => {
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
	});
});
router.post('/addVenda', (req, res) => {
	let response = {
		error: false,
		message: '',
		total: 1,
		result: 'Tudo ok',
	};
	const { select }				= req.body;
	const { valor }			= req.body;
	Carteira.addVenda(select, valor,(status, errorMessage, total, result) => {
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
	});
});

router.get('/getCarteira', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'Tudo certo',
	};
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Carteira.getCarteira(User, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.get('/getMovimenta', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'Tudo certo',
	};
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Carteira.getMovimenta(User, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.get('/getAtivos', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'Tudo certo',
	};
	Carteira.getAtivos((status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.get('/getCompras', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'Tudo certo',
	};
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Carteira.getCompras(User, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

module.exports = router;
