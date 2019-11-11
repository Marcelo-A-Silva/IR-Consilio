/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-useless-return */
const db = require('../../banco/sql');

exports.addCompra = (DATA, callback) =>	{
	let insert = '';
	const param = {
		COD: DATA.COD,QTDCOM: DATA.QTDCOM, VALATCOM:DATA.VALATCOM,   REG: DATAREG, EMOL: DATA.EMOL, LIQUID: DATA.LIQUID, IRRF: DATA.IRRF, QTVEN: DATA.QTVEN, VALVEN: DATA.VALVEN  
	};

	insert  = 'INSERT INTO	CARTEIRA					';
	
	insert += '	CD_CARTEIRA										';
	insert += '	DT_COMPRA											';
	insert += '	NR_QTDCOMPRA									';
	insert += '	NR_VALNACP										';
	insert += '	NR_TXREG											';
	insert += '	NR_EMOLUM											';
	insert += '	NR_TXLIQUI										';
	insert += '	NR_IRRF												';
	
	insert += '	CD_CARTEIRA = @COD						';
	insert += '	DT_COMPRA = sysdate()					';
	insert += '	NR_QTDCOMPRA = @QTDCOM				';
	insert += '	NR_VALNACP = @VALATCOM 				';
	insert += '	NR_TXREG = @REG								';
	insert += '	NR_EMOLUM = @EMOL							';
	insert += '	NR_TXLIQUI = @LIQUID					';
	insert += '	NR_IRRF = @IRRF								';

	db.connect((dbConn, ps, err) => {
		if (err) {
			callback(true, err);
			return;
		}
		ps.input('CD_CARTEIRA', db.getInput('int', 5));
		ps.input('DT_COMPRA',  db.getInput('datetime', 23));
		ps.input('NR_QTDCOMPRA', db.getInput('int', 5));
		ps.input('NR_VALNACP', db.getInput('int', 5));
		ps.input('NR_TXREG', db.getInput('int', 5));
		ps.input('NR_EMOLUM', db.getInput('int', 5));
		ps.input('NR_TXLIQUI', db.getInput('int', 5));
		ps.input('NR_IRRF', db.getInput('int', 5));

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




exports.addVenda = (DATA, callback) =>	{
	let insert = '';
	const param = {
		COD: DATA.COD, REG: DATA,REG, EMOL: DATA.EMOL, LIQUID: DATA.LIQUID, IRRF: DATA.IRRF, QTVEN: DATA.QTVEN, VALVEN: DATA.VALVEN  
	};

	insert = 'INSERT INTO	CARTEIRA					';
	insert += '	CD_CARTEIRA = @COD					';
	insert += '	NR_TXREG = @REG							';
	insert += '	NR_EMOLUM = @EMOL						';
	insert += '	NR_TXLIQUI = @LIQUID				';
	insert += '	NR_IRRF = @IRRF							';
	insert += '	NR_QTDVENDA = @QTVEN				';
	insert += '	NR_VALNAVD = @VALVEN				';
	insert += '	DT_VENDA = sysdate()				';

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
