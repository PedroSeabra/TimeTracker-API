import bcrypt from 'bcrypt';
import {
  FuncionarioModel as Funcionario,
  FuncionarioI,
} from '../models/FuncionarioModel.js';
import { Mailer } from '../services/Mailer.js';
import { gerarTokenJwt } from '../utils/auth.js';
import { AuthModel } from '../models/AuthModel.js';
import { Exception, InvalidParametersException } from '../utils/Errors.js';

export class AuthController {
  static autenticar = async (req: any, res: any) => {
    try {
      const { email, senha } = req.body as FuncionarioI;
      const funcionario = await Funcionario.buscarPorEmail(email);
      if (funcionario) {
        const match = bcrypt.compare(senha, funcionario.senha);
        if (match) {
          const token = gerarTokenJwt({ cpf: funcionario.cpf });
          res.json({ auth: true, token: token });
        }
      }
    } catch (e) {
      console.log(e);
      if (e instanceof Exception) {
        res.status(e.status);
        res.send(e.message);
      }
      res.status(500);
      res.send('erro desconhecido');
    }
  };

  static enviarEmailRecuperacaoSenha = async (req: any, res: any) => {
    try {
      const { email } = req.body;
      await Funcionario.buscarPorEmail(email);
      //Se existe o email fornecido, cadastra o token
      const token = await AuthModel.cadastrarTokenRecuperacaoSenhaI(email);
      const mailer = new Mailer(
        process.env.EMAIL_USER!,
        process.env.EMAIL_PASS!
      );
      mailer.setTo(email);
      mailer.setSubject('Recuperação de senha');
      mailer.setContent(
        'html',
        'Você solicitou alteração de senha, aqui está seu link: ' + token.token
      );
      res.json();
    } catch (e) {
      console.log(e);
      if (e instanceof Exception) {
        res.status(e.status);
        res.send(e.message);
      }
      res.status(500);
      res.send('erro desconhecido');
    }
  };

  static alterarSenha = async (req: any, res: any) => {
    try {
      const { token, email, novaSenha } = req.body;
      const { email: emailSolicitante } =
        await AuthModel.buscarTokenRecuperacaoSenhaI(token);
      if (emailSolicitante !== email) throw new InvalidParametersException();
      const funcionario = await Funcionario.buscarPorEmail(email);
      if (funcionario) {
        funcionario.senha = novaSenha;
        await funcionario.alterar();
      }
      res.send();
    } catch (e) {
      console.log(e);
      if (e instanceof InvalidParametersException) {
        res.status(e.status);
        res.send('Email informado não confere com email que solicitou o token');
      } else if (e instanceof Exception) {
        res.status(e.status);
        res.send(e.message);
      }
      res.status(500);
      res.send('erro desconhecido');
    }
  };
}
