exports.login = (req, res) => {
    res.render('login', {
        tipoFormulario: 'Login',
        tipoBotao: 'ENTRAR',
        trocaFormulario: 'cadastrar',
    });//rota pagina login
}