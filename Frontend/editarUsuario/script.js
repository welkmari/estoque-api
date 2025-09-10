const params = new URLSearchParams(window.location.search);
console.log("Parâmetros da URL:", window.location.search);
const usuarioId = params.get("id");


let nome = document.querySelector("#nome")
let idade = document.querySelector("#idade")
let senha = document.querySelector("#senha")

document.addEventListener("DOMContentLoaded", () => {

    fetch(`http://localhost:3000/usuarios/${usuarioId}`)
    
        .then(response => response.json())
    
        .then(data => {

            console.log(data)
            nome.value = data.nome
            idade.value = data.idade
            senha.value = data.senha
        
        })
    
        .catch(error => console.log(error));
    
})

function atualizarUsuario(event){

    event.preventDefault()
    
    fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
    
        method: 'PUT',
    
        headers: {
    
            'Content-Type': 'application/json'
    
        },
    
        body: JSON.stringify({

            nome: nome.value,
            idade: idade.value,
            cep: cep.value

        })
    
    })
    
        .then(response => response.json())
    
        .then(data => {
            
            console.log(data)
            alert(`usuario ${usuarioId} foi atualizado com sucesso!!!`)
            window.location.href = "../index.html"
        })
    
        .catch(error => console.log(error));

}
function atualizarUsuario(event) {
    event.preventDefault(); // previne o envio padrão do form, se for o caso

    // Agora pode usar o cep no fetch, por exemplo
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }
            // Preencha os campos aqui com data.logradouro, data.bairro, etc.
        })
        .catch(error => console.error('Erro:', error));
}