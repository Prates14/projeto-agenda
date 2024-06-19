const Register = require('../models/RegisterModel');

//rota pagina login
exports.login = (req, res) => {
    res.render('login', {
        tipoFormulario: 'Login',
        tipoBotao: 'ENTRAR',
        trocaFormulario: 'cadastrar',
    });
}

//função responsavel pela validação do fomrulario e uso do BD. 
//Como a função também usa o BD, ela deve ser uma Promisse (async - await).
exports.register = async function (req, res) {
    try {
        //instancia da class Register da pasta models
        const register = new Register(req.body);
        //esperar pela validação dos dados e uso do BD.
        await register.result();

        //Caso tenha erro. mensagens temporarias flash() serao realizadas
        if (register.errors.length > 0) {
            //Salvar a sessão e redirecionar de volta a pagina anterior
            req.session.save(function () {
                return res.redirect('back');
            });
            //Configurar mensagens flash para erros
            req.flash('errors', register.errors);
            return;
        } else {
            //Configurar mensagens flash para sucesso
            req.session.save(function () {
                return res.redirect('back');
            });
            req.flash('success', 'Seu usuário foi criado com sucesso!');
            return;
        }

    } catch (error) {
        res.render('err404');
        console.log(error);
    }

}