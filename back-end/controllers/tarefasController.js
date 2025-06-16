import pool from '../db/index.js' // Importando o pool para usá-los nas queries com await pool.query()

// Retorna todas as tarefas (GET)
export async function listarTarefas(req, res) {
    try {
        const resultado = await pool.query('SELECT * FROM tarefas ORDER BY id ASC') // Executa a query SELECT * FROM tarefas
        res.status(200).json(resultado.rows) // Retorna um array com todas as tarefas em JSON
    } catch (error) {
        res.status(500).json({erro: 'Erro ao buscar tarefas'}) // Se der erro responde com status 500
    }
}

// Cria uma nova tarefa (POST)
export async function criarTarefa(req, res) {
    const { titulo, concluida } = req.body // Lê titulo e concluida do req.body

    try {
        const resultado = await pool.query( // Usa SQL parametrizado com $1 e $2 para evitar SQL injection
            'INSERT INTO tarefas (titulo, concluida) VALUES ($1, $2) RETURNING *', // RETURNING * retorna a tarefa recém-criada
            [titulo, concluida]
        )
        res.status(201).json(resultado.rows[0]) // Status 201 Created em sucesso
    } catch (error) {
        res.status(500).json({erro: 'Erro ao criar tarefa'}) // Se der erro responde com status 500
    }
}

// Atualiza uma tarefa existente (PUT)
export async function atualizarTarefa(req, res) {
    const { id } = req.params
    const { titulo, concluida} = req.body

    try {
        const resultado = await pool.query( // Atualiza a tarefa com base no id, em sucesso retorna a tarefa atualizada
            'UPDATE tarefas SET titulo = $1, concluida = $2 WHERE id = $3 RETURNING *',
            [titulo, concluida, id]
        )

        if (resultado.rowCount === 0) { // Se nenhuma linha for afetada (rowCount === 0), retorna 404
            return res.status(404).json({erro: 'Tarefa não encontrada'})
        }

        res.status(200).json(resultado.rows[0])
    } catch (error) {
        res.status(500).json({erro: 'Erro ao atualizar tarefa'})
    }
}

// Remove uma tarefa pelo id (DELETE)
export async function deletarTarefa(req, res) {
    const { id } = req.params

    try {
        const resultado = await pool.query( // Deleta uma tarefa pelo id
            'DELETE FROM tarefas WHERE id = $1',
            [id]
        )

        if (resultado.rowCount === 0) { // Se a tarefa não existir, responde com 404
            return res.status(404).json({erro: 'Tarefa não encontrada'})
        }

        res.sendStatus(204) // Se sucesso, retorna 204
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao deletar tarefa'})
    }
}