require('dotenv').config();//segurança de user e senha stringConexão

const express = require('express'); //inportando o framework Express
const app = express(); //Express em execução

//conexão mongoose com o mongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNSTRING).then(() => {
    app.emit('iniciar');
}).catch(e => console.log(e));

//pacotes para sessão e mensagens temporarias de sessão
const session = require('express-session');
const MongoStore = require('connect-mongo'); //salvar no banco de dados
const flash = require('connect-flash'); //as flash menssages sao salvas na 'express-session'

const routes = require('./routes'); //rotas da aplicação
const path = require('path'); //trabalhar com caminhos
const helmet = require('helmet'); //helmet para configurar adequadamente o cabeçalho http para melhorar a segurança
const csrf = require('csurf'); //CSRF cria um token de segurança para fomrulários/solicitações
const { middlewareCsrfError, middlewareCsrfToken, middlewareLocal } = require('./src/middlewares/middlewareCsrf'); //middlewares para o pacote CSRF

app.use(helmet()); //apenas use e pronto
app.use(express.urlencoded({ extended: true })); //tratamento do method = POST (sem isso o post é undefined)
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); //para arquivos estaticos

//criando sessão
const sessionOptions = session({
    secret: 'Posso colocar qualquer coisa aqui',
    store: MongoStore.create({ mongoUrl: process.env.CONNSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: true,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views')); //arquivos que renderizam na tela
app.set('view engine', 'ejs'); //engine para renderizar html

app.use(csrf()); //Ser executado logo antes de iniciar o servidor (app.listen) e é usado middlewares para tratamento e uso do CSRF
app.use(middlewareCsrfError); //middlewares para tratamento e uso do CSRF
app.use(middlewareCsrfToken); //middlewares para tratamento e uso do CSRF token
app.use(middlewareLocal); //middlewares para uso de variaveis locais
app.use(routes);

app.on('iniciar', () => {
    app.listen(8080, () => {
        console.log('Pode Acessar http://localhost:8080');
    })
})