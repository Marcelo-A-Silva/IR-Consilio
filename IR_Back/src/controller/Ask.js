const express = require('express');
const Ask = require('../model/Ask');
const utils = require('../../utils/utils');

const router = express.Router();

router.get('/getQuestion', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 1,
	};
	const params = req.query;
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);

	Ask.getQuestion(User, params, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.post('/doQuestion', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 0,
	};
	const params = req.body;
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Ask.doQuestion(User, params, (status, errorMessage, total, result) => {
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
