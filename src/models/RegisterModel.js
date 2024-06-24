const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    email: { type: String, required: true },
    senha: { type: String, required: true },
});

const RegisterModel = mongoose.model('Register', RegisterSchema);

class Register {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    //Login do usuario
    async loginResult() {
        //validando inputs
        this.valida();
        if (this.errors.length > 0) return;

        //Verificar se email do usuario existe
        this.user = await RegisterModel.findOne({ email: this.body.email });
        if(!this.user) {
            this.errors.push('Usuário ou senha inválidos.');
            return;
        }

        //Verificando a senha do usuario
        if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
            this.errors.push('Senha incorreta.');
            this.user = null;
            return;
        }
    }

    //Cadastar o usuario
    async cadastroResult() {
        //validando inputs
        this.valida();
        if (this.errors.length > 0) return;

        //validando existente da conta
        await this.userExiste();
        if (this.errors.length > 0) return;

        //criptografar a senha do usuario antes de enviar ao BD
        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);
        //Criando usuario no BD
        this.user = await RegisterModel.create(this.body);
    }

    //Verificar se conta email ja existe
    async userExiste() {
        this.user = await RegisterModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Usuário já existente. Use outro email.');
    }

    //Verificando se os campos estão corretos
    valida() {
        this.cleanUp();

        //Validação
        if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
        if (this.body.senha.length < 6 || this.body.senha.length > 30) this.errors.push('A senha precisa ter entre 6 e 30 caracteres.');
    }

    cleanUp() { //Garantir que sejam "APENAS" os dados alvos e, que os dados sejam apenas de um tipo(String)
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            senha: this.body.senha
        };
    }

}

module.exports = Register;