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

        //Caso tenha erro. mensaegns temporarias flash() serao realizadas
        if (register.errors.length > 0) {
            //Configurar mensagens flash para erros
            req.flash('errors', register.errors);
            //Salvar a sessão e redirecionar de volta a pagina anterior
            req.session.save(function () {
                if (!res.headersSent) {
                    console.log(res)
                    res.redirect('back');
                }
            });
            return;
        }

        //Configurar mensagens flash para sucesso
        req.flash('success', 'Seu usuário foi criado com sucesso!');
        req.session.save(function () {
            if (!res.headersSent) {
                console.log(res)
                res.redirect('back');
            }
        });
        return;

    } catch (error) {
        console.log(error);
        if (!res.headersSent) {
            return res.render('err404');
        }
    }

}