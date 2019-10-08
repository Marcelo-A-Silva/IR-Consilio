/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const db = require('../../banco/sql');

exports.loginUser = (nome, senha, callback) => {
	let qry = '';
	let token = '';
	const secret = 'helpdesk';
	const param = { LOGIN: nome, PASS: senha };
	qry = ' SELECT ID,USR.LOGIN,USR.NOME,		';
	qry += ' USR.TECNICO,USR.PERMISSAO				';
	qry += ' FROM USUARIOS USR 												';
	qry += ' WHERE USR.LOGIN = @LOGIN 					';
	qry += ' AND USR.SENHA = @PASS 								';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}

		ps.input('LOGIN', db.getInput('varchar', 20));
		ps.input('PASS', db.getInput('varchar', 20));
		db.execute(ps, qry, param, (recordset, affected, errExec) => {
			const data = recordset;
			if (errExec) {
				callback(true, errExec);
				dbConn.close();
				return;
			}

			if (recordset.rowsAffected < 1) {
				callback(true, 'Usuário ou senha incorretos');
				dbConn.close();
				return;
			}

			token = jwt.sign({ User: data.recordset[0] }, secret, { expiresIn: 86400 });
			data.recordset[0].TOKEN = token;

			qry = `UPDATE USUARIOS SET TOKEN = '${token}' WHERE ID = ${data.recordset[0].ID}`;

			db.quickExecute(qry, (errUpd, rest, rowUpd) => {
				if (errUpd) {
					callback(true, 'Usuário ou senha incorretos', rest, rowUpd);
					dbConn.close();
					return;
				}
				callback(false, 'Parabéns você logou com sucesso', recordset.rowsAffected, data.recordset[0].TOKEN, data.recordset[0].NOME, data.recordset[0].TECNICO, data.recordset[0].PERMISSAO, data.recordset[0].CENTRO_DE_CUSTO);
			});
		});
	});
};

exports.validToken = (token, callback) => {
	let qry = '';
	const param = {};

	qry = 'SELECT 																			';
	qry += '	COUNT(TOKEN) AS TOKEN			';
	qry += 'FROM 																				';
	qry += '	USUARIOS 															';
	qry += 'WHERE 																			';
	qry += 'USUARIOS.TOKEN = @TOKEN 	';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('TOKEN', db.getInput('varchar', 'max'));

		param.TOKEN = token;

		db.execute(ps, qry, param, (recordset, affected, errExec) => {
			const data = recordset;
			if (errExec) {
				callback(true, 'Token invalido');
				dbConn.close();
				return;
			}
			if (recordset.rowsAffected <= 0) {
				callback(true, 'Token invalido');
				dbConn.close();
				return;
			}
			if (data.recordset.TOKEN <= 0) {
				callback(true, 'Token invalido');
				dbConn.close();
				return;
			}
			callback(false, '', data.recordset.TOKEN);
			dbConn.close();
		});
	});
};
