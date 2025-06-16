import pool from '../db/index.js';      // Conexão com o PostgreSQL
import bcrypt from 'bcrypt';         // Para criptografar a senha


export async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;        // Extrai dados do (body) da requisição (POST)

    try {
        const emailExistente = await pool.query(    // Verifica se o email já está cadastrado
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (emailExistente.rows.length > 0) {       // Se encontrou um e-mail no banco, responde com erro 400
            return res.status(400).json({ erro: 'E-mail já cadastrado'});
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);        // Criptografa a senha antes de salvar

        // Insere o novo usuário com a senha criptografada
        const resultado = await pool.query(
            `INSERT INTO usuarios (nome, email, senha)
             VALUES ($1, $2, $3)
             RETURNING id, nome, email`,
             [nome, email, senhaCriptografada]
        );

        // Envia os dados do novo usuário como resposta JSON
        const novoUsuario = resultado.rows[0];
        return res.status(201).json(novoUsuario);
    } catch (erro) {        
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao cadastrar usuário'});     // Se algo der errado retorna erro 500
    }
}