const express = require('express');

const Login = require('../controller/Login');
const Cadastro = require('../controller/Cadastro');
const Carteira = require('../controller/Carteira');
const utils = require('../../utils/utils');

const router = express.Router();


router.use('/Login', Login);
router.use('/Cadastro', Cadastro);
router.use('/Carteira', utils.validAuthorization, Carteira);

module.exports = router;
