import express from 'express';
import { cadastrarUsuario } from '../controllers/usuariosController.js';


const router = express.Router()     // Cria um roteador específico


// Rota POST /usuarios
router.post('/usuarios', cadastrarUsuario)


export default router;