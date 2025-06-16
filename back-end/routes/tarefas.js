import express from 'express'
import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  deletarTarefa
} from '../controllers/tarefasController.js' // Importando os controladores


// É uma miniaplicação de rotas, ele vai armazenar todos os caminhos como /tarefas, /tarefas/:id, etc
const router = express.Router()

// Rotas RESTful da entidade tarefas
router.get('/', listarTarefas) // GET /tarefas
router.post('/', criarTarefa) // POST /tarefas
router.put('/', atualizarTarefa) // PUT /tarefas/:id
router.delete('/', deletarTarefa) // DELETE /tarefas/:id

// Permite usar esse arquivo no server.js
export default router