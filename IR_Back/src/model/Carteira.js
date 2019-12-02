/* eslint-disable */
const db = require('../../banco/sql');

exports.addCompra = (select, quant, valor, User, callback) =>	{
	let insert = '';
	const param = {USER: User.ID, ATIVO: select, QUANT: quant, VAL: valor};
	console.log(param);

	insert = 'INSERT INTO	MOVIMENTACOES	(		';
	insert += ' USUARIO,										';
	insert += ' CARTEIRA,										';
	insert += ' ATIVO,											';
	insert += ' VALOR_COM,									';
	insert += ' QUANTIDADE,									';
	insert += ' TIPO, 											';
	insert += ' DTCOM 											';
	insert += '	)	VALUES	(									';
	insert += '	@USER,											';
	insert += '	@USER,											';
	insert += '	@ATIVO,											';
	insert += '	@VAL,												';
	insert += '	@QUANT,	  									';
	insert += '	1,													';
	insert += '	GETDATE()	)									';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('USER', db.getInput('int'));
		ps.input('ATIVO', db.getInput('int'));
		ps.input('VAL', db.getInput('float'));
		ps.input('QUANT', db.getInput('int'));

		db.execute(ps, insert, param, (recordset, affected, fail) => {
			let errFail = '';
			if (fail || affected <= 0) {
				dbConn.close();
				console.log(fail);
				errFail = ' Houve um problema ao concluir o compra';
				callback(true, errFail);
				return;
			}
			callback(false, 'Compra realizada com sucesso', 0, recordset);
		});
	});
};

exports.addVenda = (select, valor, callback) =>	{
	let insert = '';
	const param = {MOV: select, VAL: valor};
	console.log(param);

	insert = 'UPDATE MOVIMENTACOES SET VALOR_VEN= @VAL, DTVEM = GETDATE(), IMPOSTO = (@VAL* 0.0005) WHERE ID = @MOV ';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('VAL', db.getInput('float'));
		ps.input('MOV', db.getInput('int'));

		db.execute(ps, insert, param, (recordset, affected, fail) => {
			let errFail = '';
			if (fail || affected <= 0) {
				dbConn.close();
				console.log(fail);
				errFail = ' Houve um problema ao concluir o compra';
				callback(true, errFail);
				return;
			}
			callback(false, 'Compra realizada com sucesso', 0, recordset);
		});
	});
};

exports.getCarteira = (User, callback) => {
	let qry = '';
	const param = {
		USER: User.ID,
	};
	qry += '	AND	REQUISICOES_ID = @ID						';
	qry += '	WHERE ANEXOS.D_E_L_E_T IS NULL			';
	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('USER', db.getInput('int'));
		db.execute(ps, qry, param, (recordset, affected, errExec) => {
			const data = recordset;
			if (errExec) {
				dbConn.close();
				callback(true, 'Ocorreu um problema, favor tente novamente');
				return;
			}
			callback(false, '', 0, data.recordset);
		});
	});
};

exports.getMovimenta = (User, callback) => {
	let qry = '';
	const param = {
		USER: User.ID,
	};
	qry +=	' SELECT 																					';
	qry +=	' 	AT.ATIVO,																			';
	qry +=	' 	MO.QUANTIDADE, 																';
	qry +=	' 	MO.VALOR_COM, 																';
	qry +=	' 	(MO.VALOR_COM * MO.QUANTIDADE) AS TOT, 				';
	qry +=	' 	CONVERT(VARCHAR,MO.DTCOM,103) AS DTCP, 				';
	qry +=	' 	MO.VALOR_VEN,																	';
	qry +=	' 	(MO.VALOR_VEN * MO.QUANTIDADE) AS VENTOT,			';
	qry +=	' 	CONVERT(VARCHAR,MO.DTVEM,103) AS DTVE, 				';
	qry +=	' 	((MO.VALOR_VEN * MO.QUANTIDADE) - (MO.VALOR_COM * MO.QUANTIDADE)) AS SALDO,				';
	qry +=	' 	(CASE																					';
	qry +=	'			WHEN MO.DTCOM < MO.DTVEM THEN ((MO.QUANTIDADE*MO.VALOR_VEN * 0.0005)+(MO.QUANTIDADE*MO.VALOR_VEN * 0.15))  ';
	qry +=	'			ELSE ((MO.QUANTIDADE*MO.VALOR_VEN * 0.01)+ (MO.QUANTIDADE*MO.VALOR_VEN * 0.15))			';
	qry +=	'		END) AS IMP 																	';
	qry +=	' FROM MOVIMENTACOES MO														';
	qry +=	' 	INNER JOIN ATIVOS AT ON MO.ATIVO = AT.ID			';
	qry +=	' WHERE	MO.USUARIO = @USER												';
	qry +=	' 	AND	MO.D_E_L_E_T IS NULL											';
	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('USER', db.getInput('int'));
		db.execute(ps, qry, param, (recordset, affected, errExec) => {
			const data = recordset;
			if (errExec) {
				dbConn.close();
				console.log(errExec);
				callback(true, 'Ocorreu um problema ao buscar as movimentações');
				return;
			}
			console.log(data.recordset);
			callback(false, '', 0, data.recordset);
		});
	});
};
exports.getAtivos = (callback) => {
	let qry = '';
	qry  =	' SELECT 				';
	qry +=	' 	ID, 				';
	qry +=	' 	ATIVO 			';
	qry +=	' FROM ATIVOS		';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		db.quickExecute(qry, (err,recordset) => {
			const data = recordset;
			if (err) {
				console.log(err);
				callback(true, 'Ocorreu um erro problema ao buscar os ativos');
				return;
			}
			callback(false, '', 0, data.recordset);
		});
	})
};
exports.getCompras = (User, callback) => {
	let qry = '';
	const param = {
		USER: User.ID,
	};
	qry += '  SELECT 																				';
	qry += '  	MO.ID, 																			';
	qry += '  	CONCAT(MO.ID, \' - \',AT.ATIVO) AS ATIVO,		';
	qry += '   	MO.VALOR_COM,																';
	qry += '   	MO.QUANTIDADE																';
	qry += '  FROM MOVIMENTACOES MO													';
	qry += '   INNER JOIN ATIVOS AT ON AT.ID = MO.ATIVO			';
	qry += '  WHERE  MO.USUARIO = @USER											';
	qry += '  	AND	 MO.DTVEM IS NULL												';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('USER', db.getInput('int'));
		db.execute(ps, qry, param, (recordset, affected, errExec) => {
			const data = recordset;
			if (errExec) {
				dbConn.close();
				callback(true, 'Ocorreu um problema ao buscar as compras.');
				return;
			}
			callback(false, '', 0, data.recordset);
		});
	});
};