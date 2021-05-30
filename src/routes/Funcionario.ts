import express from 'express';
import { FuncionarioController } from '../controllers/FuncionarioController.js';

const routes = express.Router();
const { listar, cadastrar, buscarPorEmail, alterar } = FuncionarioController;

routes.route('/').get(listar);
routes.route('/cadastrar').post(cadastrar);
routes.route('/:email').get(buscarPorEmail).put(alterar);

export default routes;
