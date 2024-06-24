const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const { render } = require('ejs');

//rotas da home
route.get('/', homeController.index);

//rotas de login|cadastro
route.get('/formlogin', loginController.formLogin);
route.post('/formlogin/register', loginController.register);
//rotas de login e perfil
route.post('/formlogin/profile', loginController.login);
route.get('/formlogin/profile', (req, res) => res.render('account'));

module.exports = route;