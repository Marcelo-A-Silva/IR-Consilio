const express = require('express');
const utils = require('../../utils/utils');
const Notifications = require('../model/Notifications');

const router = express.Router();

router.get('/', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 1,
	};
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Notifications.getData(User, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		console.log(response);
		res.send(response);
	});
});
module.exports = router;
