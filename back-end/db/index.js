import pkg from 'pg' // Biblioteca oficial do Node.js para se conectar com o PostgreSQL
import dotenv from 'dotenv' // Biblioteca para ler as variáveis do arquivo .env


// Carrega variáveis do .env
dotenv.config()


// O Pool mantém várias conexões reutilizáveis com o banco, em vez de conectar e desconectar toda vez.
const { Pool } = pkg

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Permite reusar a conexão em qualquer parte do projeto
export default pool