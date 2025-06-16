import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import tarefasRoutes from './routes/tarefas.js'
import usuariosRouter from './routes/usuarios.js'


// Le o arquivo .env e carrega as variáveis de ambiente nele definidas para o process.env, evita deixar senhas e configs visíveis no código
dotenv.config() 


// Cria uma instância do servidor Express
const app = express()

// permite que o front-end consiga fazer requisições fetch para o back-end
app.use(cors())

// Faz o servidor entender requisições com JSON (ex: req.body)
app.use(express.json())


app.use(usuariosRouter) // Ativa as rotas definidas no roteador

// Diz ao Express para usar as rotas importadas de routes/tarefas.js, e adiciona o prefixo /tarefas a todas elas.
app.use('/tarefas', tarefasRoutes)

// Define a porta em que o servidor vai rodar, usa a porta configura no .env se não existir cai no valor padrão 3000
const PORT = process.env.PORT || 3000

// Inicia o servidor e começa a escutar requisições HTTP na porta definida. Com isso o back-end começa a rodar.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})