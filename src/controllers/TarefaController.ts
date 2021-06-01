import { TarefaModel } from '../models/TarefaModel.js';
import { Exception } from '../utils/Errors.js';

export class TarefaController {
  static listar = async (req: any, res: any) => {
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

  static cadastrar = async (req: any, res: any) => {
    try {
      const novaTarefa = await new TarefaModel(req.body);
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

  static alterar = async (req: any, res: any) => {
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
