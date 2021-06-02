import express from 'express';
import { TarefaController } from '../controllers/TarefaController.js';

const routes = express.Router();
const {
  listar,
  buscarPorCodigo,
  cadastrar,
  alterar,
  apagar,
  registrarAtividade,
  atribuirResponsavel,
} = TarefaController;

routes.route('/').get(listar);
//Rotas para recuperação de senha
routes.route('/cadastrar').post(cadastrar);
routes.route('/:codTarefa').get(buscarPorCodigo).put(alterar);
routes.route('/:codTarefa').get(buscarPorCodigo).delete(apagar);
routes.route('/:codTarefa/registrar-atividade').post(registrarAtividade);
routes.route('/:codTarefa/atribuir-responsavel').post(atribuirResponsavel);

export default routes;
