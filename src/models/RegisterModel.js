const mongoose = require('mongoose');
const validator = require('validator');

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

    async result() {
        this.valida();
        if(this.errors.length > 0) return;
        this.user = await RegisterModel.create(this.body);
    }

    valida() {
        this.cleanUp();

        //Validação
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
        if(this.body.senha.length < 6 || this.body.senha.length > 30) this.errors.push('A senha precisa ter entre 6 e 30 caracteres.');
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