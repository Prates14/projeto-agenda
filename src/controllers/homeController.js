// const HomeModel = require('../models/HomeModel');

// HomeModel.create({
//     titulo: 'Primeira base de dados',
//     descricao: 'Aqui a descrição da BD'
// })
// .then(dados => console.log(dados))
// .catch(e => console.log(e));


//respostas de cada pagina que vao para suas respectivas rotas
exports.paginaInicial = (req, res) => {
    res.render('index', {
        titulo: 'Titulo da pagina',
        numeros: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    });//rota pagina home renderizado
    return;
}

exports.respostaPost = (req, res) => {
    res.send(req.body); //rota pagina teste
    return;
}