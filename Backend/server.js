const e = require('express');
const express = require('express'); //importa o Express
const cors = require('cors'); //importa o CORS

const app = express(); //Criar o servidor

const port = 3000; //Variavel para armazenar a porta

//Para Permitir receber json nas requisições
app.use(express.json());
app.use(cors());

const usuarios = [
    {"id" : 1 ,"nome": "Mari Welk", "idade": 18, "senha":"1234"},
    {"id" : 2, "nome":"Admin", "idade" : 18, "senha" : "123"}
]

let nextId = 3;

//req - request(requisição)
//res - response(resposta)
app.get("/", (req,res)=>{
    res.send("Primeiro Servidor Sesi");

})

//Buscar todos os usuários
app.get("/usuarios" , (req,res) =>{
    //send - Envia dados
    res.send(usuarios);
})

//buscar um usuário -> get by id
app.get("/usuarios/:id",(req,res) =>{
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(usuario => usuario.id == id);

    if(usuario != null){
        res.send(usuario)
    }else{
        res.status(404).send("Usuário não encontrado!")
    }
})

//Criar um Usuário
app.post("/usuarios",(req, res) =>{
    //body - corpo da requisição
    const novoUsuario = req.body;
    novoUsuario.Id = usuarios.length +1;
    usuarios.push(novoUsuario); //Adiciona um novo id na lista de usuários
    res.send(201 ).send(novoUsuario) //Retorna o novo usuário
})

//Atualizar usuario
app.put("/usuarios/:id", (req,res)=>{
    const id= parseInt(req.params.id);
    const novoUsuario = req.body; 
    novoUsuario.id = nextId++;
    const index = usuarios.findIndex(usuario => usuario.id == id); //Procura pela lista toda se tem um id igual         
    
    if(index != null){
        usuarios[index] = novoUsuario;
        res.status(200).send(novoUsuario);
    }else{
        res.status(404).send("Usuário não encontrado!")
    }
})

//Deletar usuário
app.delete("/usuario/:id" , (req, res) =>{
    const id  =parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id); 
    
    if(index != null){
        usuarios.splice(index,1);
        res.status(200).send("Usuário com id:" + id + "Removido com sucesso!")
    }else{
        res.status(404).send("Usuário não encontrado")
    }
    
}) 

app.listen(port,()=>{
    console.log("Servidor rodando em http://localhost:3000")
})