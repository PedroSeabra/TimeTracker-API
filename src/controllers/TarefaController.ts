import { Exception } from '../utils/Errors.js';
import {
  TarefaI,
  TarefaModel as Tarefa,
} from '../models/TarefaModel.js';

export class TarefaController {
  static listar = async (req: any, res: any) => {
    try {
      const listaFuncionarios = await Tarefa.listar();
      res.json(listaFuncionarios);
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

  static cadastrar = async (req: any, res: any) => {
    try {
      const novaTarefa = await new Tarefa(req.body);
      await novaTarefa.cadastrar();
      res.json(novaTarefa);
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

  static buscarPorCodigo = async (req: any, res: any) => {
    try {
      const tarefa = await Tarefa.buscarPorCodigo(req.params.codigoTarefa);
      res.json(tarefa);
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

  static alterar = async (req: any, res: any) => {
    try {
      const novaTarefa = await new Tarefa(req.body as TarefaI);
      novaTarefa.alterar(req.params.codTarefa);
      console.log(req.params.codTarefa)
      res.json(novaTarefa);
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

  static apagar = async (req: any, res: any) => {
    try {
      const tarefa = await Tarefa.buscarPorCodigo(req.params.codTarefa);
      if (tarefa) {
        tarefa.apagar(req.params.codTarefa);
        res.status(200);
        res.send('Tarefa apagada com sucesso.');
      } else {
        res.status(500);
        res.send('erro desconhecido');
      }
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

  static registrarAtividade = async (req: any, res: any) => {
    try {
      //implementar
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

  static atribuirResponsavel = async (req: any, res: any) => {
    try {
      //implementar
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
}
