const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

//solicitação get e post - rotas da home -
route.get('/', homeController.paginaInicial);//pagina home

route.post('/', homeController.respostaPost);//pagina home

//solicitação rotas contato
route.get('/contato', contatoController.paginaInicial);//pagina home/contatoController

module.exports = route;