import express from 'express';
import { AuthController } from '../controllers/AuthController.js';

const routes = express.Router();
const { autenticar, enviarEmailRecuperacaoSenha, alterarSenha } =
  AuthController;

routes.route('autenticar').post(autenticar);
//Rotas para recuperação de senha
routes.route('recuperar-senha/enviar-email').post(enviarEmailRecuperacaoSenha);
routes.route('recuperar-senha/alterar').post(alterarSenha);

export default routes;
