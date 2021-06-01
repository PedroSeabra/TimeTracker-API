import { Exception } from '../utils/Errors.js';
import {
  FuncionarioI,
  FuncionarioModel as Funcionario,
} from '../models/FuncionarioModel.js';

//Todos os métodos devem ser estáticos
export class FuncionarioController {
  /**
   * Recuperação de todos os funcionários cadastrados
   */
  static listar = async (req: any, res: any) => {
    try {
      // Recuperação de todos os registros da tabela
      const listaFuncionarios = await Funcionario.listar();
      res.json(listaFuncionarios);
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

  static cadastrar = async (req: any, res: any) => {
    try {
      const novoFuncionario = await new Funcionario(req.body);
      await novoFuncionario.cadastrar();
      res.json(novoFuncionario);
    } catch (e) {
      console.log(e);
      if (e instanceof Exception) {
        res.status(e.status);
        res.send(e.message);
      } else {
        res.status(500);
        res.send('erro desconhecido');
      }
    }
  };

  static buscarPorEmail = async (req: any, res: any) => {
    try {
      const funcionario = await Funcionario.buscarPorEmail(req.params.email);
      res.json(funcionario);
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

  static alterar = async (req: any, res: any) => {
    try {
      const novoFuncionario = await new Funcionario(req.body as FuncionarioI);
      novoFuncionario.alterar();
      res.json(novoFuncionario);
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
}
