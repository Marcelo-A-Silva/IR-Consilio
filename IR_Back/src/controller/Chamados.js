/* eslint-disable no-shadow */
const express = require('express');
const Chamados = require('../model/Chamados');
const utils = require('../../utils/utils');

const router = express.Router();

router.get('/getAllSegmentos', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'Tudo certo',
	};

	Chamados.getAllSegmentos((status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.post('/createReq', (req, res) => {
	let response = {
		error: false,
		message: '',
		total: 1,
		result: 'Tudo ok',
	};

	const {
		requisicao, descricao, select, descricaoEquip, prioridade,
	} = req.body;
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);

	Chamados.createReq(requisicao, descricao, select, descricaoEquip, prioridade, User, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.put('/updateRequi', (req, res) => {
	let response = {
		error: false,
		message: '',
		total: 1,
		result: 'Tudo ok',
	};
	const params = req.body;
	const code = params.CODE;
	const { requisicao } = params.VALUE;
	const { descricao } = params.VALUE;
	const select = params.VALUE.select.ID;
	const { descricaoEquip } = params.VALUE;
	const { prioridade } = params.VALUE;
	Chamados.updateRequi(requisicao, descricao, select, descricaoEquip, prioridade, code, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.put('/deleteRequisicao', (req, res) => {
	let response = {
		error: false,
		message: '',
		total: 1,
		result: 'Tudo ok',
	};
	const params = req.body;
	Chamados.deleteRequisicao(params, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.get('/getUsuarios', (req, res) => {
	let	response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'TÁOK',
	};

	Chamados.getUsuarios((status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.get('/getRequisitions', (req, res) => {
	let	response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	const params = req.query;

	Chamados.getRequisicao(User, params, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.put('/updateTecnico', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		result: 'Ok',
	};
	const { token } = req.headers;
	const { User } 	= utils.decoteJwt(token);
	const params = req.body;
	const cod = { code: params.COD };
	Chamados.updateTecnico(User, cod, (status, errorMessage, total, result) => {
		response = {
			erro: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.put('/updateOrcamento', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};

	const params = req.body;
	const cod = params.code;
	const { orcamento } = params.refer;
	const { data } = params.refer;
	Chamados.updateOrcamento(orcamento, data, cod, (status, errorMessage, total, result) => {
		response = {
			erro: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.post('/Atendimento', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};

	const params = req.body;
	const cod = params.code;
	const { tecnico } = params;
	const { token } = req.headers;
	const { User } 	= utils.decoteJwt(token);
	Chamados.verificaAtendimento(cod, User, (status, errorMessage, total, result) => {
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
		Chamados.insertAtendimento(cod, User, tecnico, (status, errorMessage, total, result) => {
			response = {
				erro: status,
				message: errorMessage,
				total_records: total,
				data: result,
			};
			res.send(response);
		});
	});
});

router.put('/pararChamado', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.body;
	const cod = params.code;
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Chamados.pararChamado(cod, User, (status, errorMessage, total, result) => {
		response = {
			erro: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.post('/FeedBack', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.body;
	const cod = params.code;
	const { status } = params;
	const { feedback } = params.refer;
	const { encerramento } = params.refer;
	const { progress } = params.refer;
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Chamados.FeedBack(cod, User, feedback, encerramento, status, progress, (status, errorMessage, total, result) => {
		response = {
			erro: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.get('/getFeedback', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.query.ID;
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Chamados.getFeedback(params, User, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.get('/getComplemento', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.query.ID;
	const { token } = req.headers;
	const { User } = utils.decoteJwt(token);
	Chamados.getComplemento(params, User, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.put('/Aprovar', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.body;
	const { cod } = params;
	const { token } = req.headers;
	const { User } 	= utils.decoteJwt(token);
	Chamados.Aprovar(cod, User, (status, errorMessage, total, result) => {
		response = {
			erro: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.put('/Reprovar', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.body;
	const { cod } = params;
	const { token } = req.headers;
	const { User } 	= utils.decoteJwt(token);
	Chamados.Reprovar(cod, User, (status, errorMessage, total, result) => {
		response = {
			erro: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.get('/getDataTecnico', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const id = req.query.ID;
	const { token } = req.headers;
	const { User } 	= utils.decoteJwt(token);
	Chamados.getDataTecnico(User, id, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});

router.get('/userRelaciona', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const id = req.query.ID;
	const { token } = req.headers;
	const { User } 	= utils.decoteJwt(token);
	Chamados.userRelaciona( User, id, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});


router.put('/tecnicoNovo', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.body;
	const { code } = params;
	const id = params.ID;
	Chamados.tecnicoNovo(code, id, (status, errorMessage, total, result) => {
		response = {
			error: status,
			message: errorMessage,
			total_records: total,
			data: result,
		};
		res.send(response);
	});
});
router.post('/tecnicoSecundario', (req, res) => {
	let response = {
		error: false,
		message: '',
		total_records: 1,
		data: 'Ok',
	};
	const params = req.body;
	const { code } = params;
	const id = params.ID;

	Chamados.verificaTecnico(code, id, (status, errorMessage, total, result) => {
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
		Chamados.adicionarTecnicoSec(code, id, (status, errorMessage, total, result) => {
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

router.put('/updatePessoa',  (req, res) => {
	let response = {
		error: false,
		message: '',
		total: 1,
		result: 'Tudo ok',
	};
	const params = req.body;
	const pessoa = params.Pessoas;
	const cod = params.ID;
	Chamados.verificarUser(pessoa, cod, (status, errorMessage, total, result) => {
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
		Chamados.updatePessoa(pessoa, cod, (status, errorMessage, total, result) => {
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

module.exports = router;
