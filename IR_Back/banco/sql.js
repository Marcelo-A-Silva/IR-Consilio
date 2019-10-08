const sql = require('mssql');
const config = require('../config/config.json');

exports.connect = (callback) => { 
	var dbConn 	= {};
	var ps 		= {};

	dbConn = new sql.ConnectionPool(config.dbConfig);
	dbConn.connect().then(function(){ 			
		ps = new sql.PreparedStatement(dbConn);	 	
		callback(dbConn,ps); 
	}).catch(function(err){  
		callback(null,null,"[CONNECTION SQL] " + err.message);
	});
};
exports.quickExecute = (sqlvalue, callback) => {
	sql.connect(config.dbConfig).then(() => {
		const request = new sql.Request();
		request.query(sqlvalue).then((recordset) => {
			callback(null, recordset, request.rowsAffected);
			sql.close()
		}).catch((err) => {
			callback(`[REQUEST SQL ERROR] ${err}`);
			sql.close()
		});
	}).catch((err) => {
		if (err) callback(`[CONNECTION SQL] ${err}`);
		sql.close()
	});
};
exports.execute = (ps, query, param, callback) => {

	ps.prepare(query, (err) => {
		if (err) {
			callback(null, null, `[PREPARE SQL] ${err.precedingErrors}`);
			return;
		}

		ps.execute(param, (errExec, recordset, affected) => {
			if (errExec) {
				callback(null, null, errExec.message);
				return;
			}

			ps.unprepare((errUnp) => {
				if (errUnp) {
					callback(null, null, errUnp);
					return;
				}
			});

			callback(recordset, affected);
		});

	});
};

exports.getInput = function(type,length){
	var inputType = {};
	switch(type){
		case 'int':
			inputType = sql.Int;
			break;
		case 'float':
			inputType = sql.Float;
			break;
		case 'real':
			inputType = sql.Real;
			break;
		case 'char':
			inputType = sql.Char(length);
			break;
		case 'nchar':
			inputType = sql.NChar(length);
			break;
		case 'text':
			inputType = sql.Text;
			break;
		case 'ntext':
			inputType = sql.NText;
			break;
		case 'varchar':
			inputType = sql.VarChar(length);
			break;
		case 'nvarchar':
			inputType = sql.NVarChar(length);
			break;
		case 'date':
			inputType = sql.Date;
			break;
		case 'time':
			inputType = sql.Time(length);
			break;
		case 'datetime':
			inputType = sql.DateTime(length);
			break;
		default:
	 		inputType = sql.VarChar(200);
	} 
	
	return inputType;

};
