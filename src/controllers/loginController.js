const Register = require('../models/RegisterModel');

//rota pagina login
exports.formLogin = (req, res) => {
    res.render('formlogin', {
        tipoFormulario: 'Login',
        tipoBotao: 'ENTRAR',
        trocaFormulario: 'cadastrar',
    });
}

//função responsavel pela validação do fomrulario, cadastro e uso do BD.
//Como a função também usa o BD, ela deve ser uma Promisse (async - await).
exports.register = async function (req, res) {
    try {
        //instancia da class Register da pasta models
        const register = new Register(req.body);
        //esperar pela validação dos dados e uso do BD.
        await register.cadastroResult();

        //Caso tenha erro. mensagens temporarias flash() serao realizadas
        if (register.errors.length > 0) {
            //Configurar mensagens flash para erros
            req.flash('errors', register.errors);
            //Salvar a sessão e redirecionar de volta a pagina anterior
            req.session.save(function () {
                return res.redirect('/formlogin');
            });
            return;
        }
        //Configurar mensagens flash para sucesso
        req.flash('success', 'Seu usuário foi criado com sucesso! Realize o login para entrar na sua conta.');
        req.session.save(function () {
            return res.redirect('/formlogin');
        });
        return;

    } catch (error) {
        res.render('err404');
        console.log(error);
    }

}

//função responsavel pelo login do usuario. uso do BD.
exports.login = async function (req, res) {
    try {
        //instancia da class Register da pasta models
        const register = new Register(req.body);
        //esperar pela validação dos dados e uso do BD.
        await register.loginResult();

        //Caso tenha erro. mensagens temporarias flash() serao realizadas
        if (register.errors.length > 0) {
            //Configurar mensagens flash para erros
            req.flash('errors', register.errors);
            //Salvar a sessão e redirecionar de volta a pagina anterior
            req.session.save(function () {
                return res.redirect('/formlogin');
            });
            return;
        }
        //Configurar mensagens flash para sucesso
        req.flash('success', 'Seja bem vindo!');
        req.session.user = register.user;
        req.session.save(function () {
            res.render('account');
        });
        return;

    } catch (error) {
        res.render('err404');
        console.log(error);
    }

}