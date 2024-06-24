import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '/frontend/assets/css/style.css';
import '/frontend/assets/img/lista-contato.png';

document.getElementById('trocar').addEventListener('click', function () {
    // Obter os elementos do DOM
    const formTitle = document.getElementById('form-title');
    const formButton = document.getElementById('form-button');
    const toggleFormText = document.getElementById('toggle-form');
    const action = document.getElementById('toggle-action');

    // Verificar o estado atual e trocar os valores
    if (formTitle.innerText === 'Login') {
        formTitle.innerText = 'Cadastro';
        formButton.innerText = 'CADASTRAR';
        toggleFormText.innerText = 'login';
        action.setAttribute('action', '/formlogin/register');
    } else {
        formTitle.innerText = 'Login';
        formButton.innerText = 'ENTRAR';
        toggleFormText.innerText = 'cadastrar';
        action.setAttribute('action', '/formlogin/profile');
    }
});