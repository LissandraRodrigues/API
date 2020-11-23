// Chama o express.
const express = require('express')

// Instancia o express na variável app.
const app = express()

// Faz com que o express passe a usar a notação JSON.
app.use(express.json())

// Dados fakes de um json. 
const data = require('./data.json')

// Verbos HTTP
    // GET: Recebe dados de um resource (recurso).         
    // POST: Envia dados ou informações para serem processadas por um resource.
    // PUT: Atualiza dados de um resource.
    // DELETE: Deleta dados de um resource.

// Para pegarmos os dados de todos os clientes.
app.get('/clients', function(request, response){

    // Retorna todas as informações de todos os clientes.
    response.json(data);

})

// Para pegarmos os dados de um cliente específico.
app.get('/clients/:id', function(request, response){

    // Pega o id procurado no parâmetro.
    const { id } = request.params

    // Procura o cliente que tiver o mesmo id que o procurado.
    const client = data.find(client => client.id == id)

    // Tratamento de erro para o caso em que cliente do id procurado não exista.
    // Status 204 significa que a requisição foi feita com sucesso, mas não há conteúdo.
    if(!client) return response.status(204).json()

    // Retorna o cliente que tiver o id procurado.
    response.json(client)

})

app.post('/clients', function(request, response){

    // Pega do body os dados.
    const { name, email } = request.body
    
    // Aqui entraria o procedimento de salvar no banco de dados.

    // Retorna o nome e e-mail resgatado apenas para confirmar que deu tudo certo.
    response.json({ name, email })

})

app.put('/clients/:id', function(request, response){

    // Pega o id procurado no parâmetro.
    const { id } = request.params

    // Procura o cliente que tiver o mesmo id que o procurado.
    const client = data.find(client => client.id == id)

    // Tratamento de erro para o caso em que cliente do id procurado não exista.
    // Status 204 significa que a requisição foi feita com sucesso, mas não há conteúdo.
    if(!client) return response.status(204).json()

    // Pega o novo nome.
    const { name } = request.body
    
    // Atualiza o nome.
    client.name = name

    // Retorna o cliente atualizado.
    response.json(client)

})

app.delete('/clients/:id', function(request, response){

    // Pega o id procurado no parâmetro.
    const { id } = request.params;

    // Pega todos os clientes que não tenham o id procurado.
    const clientsFilteres = data.filter(client => client.id != id)

    // Mostra todos os cliente, menos o deletado.
    response.json(clientsFilteres)

})

// Inicia o servidor na porta 3000 com a call back function.
app.listen(3000, function() {

    console.log('Server is running.')

})