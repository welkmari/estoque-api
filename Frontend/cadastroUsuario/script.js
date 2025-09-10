function cadastroUsuario(event) {
    event.preventDefault();

    console.log(event);
    console.log(event.target);
    console.log(event.target.nome);
    console.log(event.target.nome.value);

    let nome = event.target.nome.value;
    let idade = event.target.idade.value;
    let senha = event.target.senha.value;
    let cep = event.target.cep.value;

    


    fetch('http://localhost:3000/usuarios', {

        method: 'POST',

        headers: {

            'Content-Type': 'application/json'

        },

        body: JSON.stringify({
            "nome": nome,
            "idade": idade,
            "senha": senha
        })


    })

        .then(response => response.json())

        .then(dados => {
            console.log(dados)
            alert("Usuário cadastrado com sucesso");
            window.location.href ="../index.html";
        })

        .catch(error => console.log(error));
}