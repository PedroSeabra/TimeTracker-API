import express from 'express';
import { TarefaController } from '../controllers/TarefaController';

const routes = express.Router();
const {
  listar,
  buscarPorCodigo,
  cadastrar,
  alterar,
  registrarAtividade,
  atribuirResponsavel,
} = TarefaController;

routes.route('').get(listar);
//Rotas para recuperação de senha
routes.route('cadastrar').post(cadastrar);
routes.route(':codTarefa').get(buscarPorCodigo).put(alterar);
routes.route(':codTarefa/registrar-atividade').post(registrarAtividade);
routes.route(':codTarefa/atribuir-responsavel').post(atribuirResponsavel);

export default routes;
