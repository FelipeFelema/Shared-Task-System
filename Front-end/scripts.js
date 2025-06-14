const formcadastro = document.getElementById('formcadastro');

formcadastro.addEventListener('submit', function(event){
    event.preventDefault(); // Impede  o formulário de recarregar a página 

    const nome = document.getElementById('nome'). value; // value pega o que o usuario digitou no campo
    const email = document.getElementById('emailcadastro'). value;
    const senha = document.getElementById('senhacadastro').value
    // Guardar os dados no localStorage
    const usuario = {nome, email, senha};
    localStorage.setItem('usuario', JSON.stringify(usuario));

    alert('Cadastro relizado com sucesso!');
    formcadastro.reset(); //Limpa o formulario
});

 const formlogin = document.getElementById('formlogin');

 formlogin.addEventListener('submit', function(event){
    event.preventDefault();

    const emaillogin = document.getElementById('emaillogin').value;
    const senhalogin = document.getElementById('senhalogin').value;

    //Pegar os dados do usuario guardado
    const usuarioCadastrado = JSON.parse(localStorage.getItem('usuario'));

    if (!usuarioCadastrado){
        alert('Nenhum usuario cadastrado!');
        return;
    }

    if (emaillogin === usuarioCadastrado.email && senhalogin === usuarioCadastrado.senha){
        alert('Login realizado com sucesso!' + usuarioCadastrado.nome);
    } 
    else{
        alert('Email ou senha incorreto!');
    }
    formlogin.reset()
 });
