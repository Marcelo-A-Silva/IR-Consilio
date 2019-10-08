const db = require('../../banco/sql');

exports.verificaUser = (usuario, email, callback) => {
	let qry;
	const param = { USUARIO: usuario, EMAIL: email };
	qry = 'SELECT																	';
	qry += ' COUNT(*) AS	COUNTER		';
	qry += 'FROM USUARIOS									';
	qry += 'WHERE																	';
	qry += 'LOGIN = @USUARIO						';
	qry += '	OR 																		';
	qry += 'EMAIL = @EMAIL								';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('USUARIO', db.getInput('varchar', 20));
		ps.input('EMAIL', db.getInput('varchar', 40));

		db.execute(ps, qry, param, (recordset) => {
			const data = recordset;
			let errFail = '';
			if (data.recordset[0].COUNTER >= 1) {
				dbConn.close();
				errFail = 'Usuário ou e-mail já cadastrados';
				callback(true, errFail);
				return;
			}
			callback(false, '', 0, recordset);
		});
	});
};
exports.cadastroUser = (nome, sobrenome, email, sexo, usuario, senha, telefone, callback) =>	{
	const telefoneReplace = telefone.replace(/[^\d]+/g, '');
	let insert = '';
	const param = {
		NOME: nome, SOBRENOME: sobrenome, EMAIL: email, SEXO: sexo, USUARIO: usuario, SENHA: senha, TELEFONE: telefoneReplace,
	};
	insert = 'INSERT INTO							';
	insert += '		USUARIOS								';
	insert += '(																';
	insert += '					NOME,							';
	insert += '					SOBRENOME,		';
	insert += '					EMAIL,						';
	insert += '					SEXO,							';
	insert +=	'					LOGIN,						';
	insert += '     SENHA,						';
	insert += '     TELEFONE				';
	insert += ')VALUES										';
	insert += '(																';
	insert +=	'					@NOME,						';
	insert +=	'					@SOBRENOME,	';
	insert +=	'					@EMAIL,					';
	insert +=	'					@SEXO,						';
	insert +=	'					@USUARIO,			';
	insert +=	'					@SENHA,					';
	insert += '					@TELEFONE)		';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('NOME', db.getInput('varchar', 20));
		ps.input('SOBRENOME', db.getInput('varchar', 20));
		ps.input('EMAIL', db.getInput('varchar', 60));
		ps.input('SEXO', db.getInput('char', 1));
		ps.input('USUARIO', db.getInput('varchar', 20));
		ps.input('SENHA', db.getInput('varchar', 20));
		ps.input('TELEFONE', db.getInput('varchar', 50));

		db.execute(ps, insert, param, (recordset, affected, fail) => {
			let errFail = '';
			if (fail || affected <= 0) {
				dbConn.close();
				errFail = ' Houve um problema ao concluir o cadastro';
				callback(true, errFail);
				return;
			}
			callback(false, 'Cadastro realizado com sucesso', 0, recordset);
		});
	});
};
exports.updateTechnical = (params, callback) => {
	let qry = '';
	const code = params.USER.register;
	const permisson = params.USER.radioGroup;
	const segmento = params.USER.select;
	const param = { CODE: code, PERMISSION: permisson, SEGMENTO: segmento };

	qry = 	'UPDATE USUARIOS SET															';
	qry += 'PERMISSAO = 	@PERMISSION										';
	if (permisson > 3) {
		qry += ',TECNICO = \'S\' 																	';
	}
	if (segmento !== '') {
		qry += ',SEGMENTO_ID = @SEGMENTO									';
	}
	qry += 'WHERE ID = @CODE																		';
	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('CODE', db.getInput('int'));

		ps.input('PERMISSION', db.getInput('int'));
		if (segmento !== '') {
			ps.input('SEGMENTO', db.getInput('int'));
		}
		db.execute(ps, qry, param, (recordset, affected, fail) => {
			if (fail || affected <= 0) {
				dbConn.close();
				callback(true, 'Errou ao atualizar o usuário');
				return;
			}
			callback(false, 'Usuário atualizado com sucesso', null, null);
		});
	});
};
