const Register = require('../models/RegisterModel');

exports.login = (req, res) => {
    res.render('login', {
        tipoFormulario: 'Login',
        tipoBotao: 'ENTRAR',
        trocaFormulario: 'cadastrar',
    });//rota pagina login
}

exports.register = (req, res) => {
    const register = new Register(req.body);
    register.result();
    res.send('a');
}