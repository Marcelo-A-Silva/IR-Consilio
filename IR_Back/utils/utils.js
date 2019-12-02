/* eslint-disable */
const jwt = require('jsonwebtoken');
const db = require('../banco/sql');
const Base64 = require('./base64');
const config = require('../config/config.json');

exports.encode64 = string => Base64.encode(string);
exports.decode64 = string => Base64.decode(string);

exports.clearCharMemo = (strMemo, crlf = null) => {
	if (strMemo && crlf) return strMemo.replace(/\0/g, '').replace(/(?:\r|\t)/g, ' ');
	if (strMemo) return strMemo.replace(/\0/g, '').replace(/(?:\r\n|\r|\n|\t)/g, ' ');
	return strMemo;
};

exports.decoteJwt = (token) => {
	const secret = 'irConsi';
	const decoded = jwt.verify(token, secret);
	return decoded;
};

exports.getIsNoLock = key => (config.noLock.indexOf(key) < 0 ? '  ' : ' (NOLOCK) ');


exports.maskText = (text, mask) => {
	if (text === undefined) {
		return text;
	}

	let aux;

	let pos = 0;
	let newValue = '';
	let maskLength = text.length;

	for (let i = 0; i <= maskLength; i += 1) {
		aux = ((mask.charAt(i) === '-') || (mask.charAt(i) === '.') || (mask.charAt(i) === '/'));
		aux = aux || ((mask.charAt(i) === '(') || (mask.charAt(i) === ')') || (mask.charAt(i) === ' '));

		if (aux) {
			newValue += mask.charAt(i);
			maskLength += 1;
		} else {
			newValue += text.charAt(pos);
			pos += 1;
		}
	}

	return newValue;
};

exports.validAuthorization = (req, res, next) => {
	const { token } = req.headers;
	var secret = 'irConsi';

	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			res.status(401).send({ error: true, message: 'Usuário sem acesso para está area' });
			return;
		}

		next();
	});
};
