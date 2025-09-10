
fetch("http://localhost:3000/usuarios").then(async res => {

    if (!res.ok) {

        throw new Error("erro na requisição...")

    }

    return res.json()
}).then(usuarios => {

    const listaUsuarios = document.querySelector("#lista-usuarios")
    usuarios.forEach(usuario => {

        console.log(usuario.nome)
        listaUsuarios.innerHTML += `
        
        <li class="list-group-item">
        <div class = "d-flex justify-content-between">
                <h5>nome: ${usuario.nome} - idade: ${usuario.idade}</h5>
                <div>
                    <a href="editarUsuario/index.html?id=${usuario.id}">
                    <button type="button" class="btn btn-primary btn-atualizar">Atualizar</button></a>
                    <button type="button" class="btn btn-danger" onclick="deletarUsuario(${usuario.id})">Deletar</button>
                </div>
            </div>
        <li>`

    });

}).catch(err => {

    console.log(err)

})

function deletarUsuario(userId) {

    let confirmar = confirm(`Você quer realmente excluir o Usuario ${ userId } ?`)
    if (confirmar) {

        fetch(`http://localhost:3000/usuarios/${userId}`, {

            method: 'DELETE',

        })

            .then(response => {

                if (response.ok) {

                    alert(`Usuario ${ userId } excluido com sucesso...`)
                    window.location.reload()
                    return;
                }

                alert("Algo deu errado...")

            })

            .catch(error => console.log(error));

    }
}
function preencherCep() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove tudo que não for número

    if (cep.length !== 8) {
        alert('CEP inválido! Deve conter 8 números.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }
            document.getElementById('rua').value = data.rua;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.cidade;
            document.getElementById('estado').value = data.estado;
        })
        .catch(error => {
            console.error('Erro ao buscar CEP:', error);
            alert('Erro ao buscar o CEP');
        });
}