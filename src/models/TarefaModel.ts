import { FuncionarioI } from './FuncionarioModel.js';
import { TarefaDAO } from '../DAOs/TarefaDAO.js';
import {
  InvalidParametersException,
  NotFoundException,
} from '../utils/Errors.js';

export interface TarefaI {
  codTarefa: number;
  codSprint: number;
  nome: string;
  descricao?: string;
  tempoEstimado?: string;
  dataEntrega?: string;
  status?: number;
  responsavel?: string | FuncionarioI;
}

export class TarefaModel implements TarefaI {
  public codTarefa: number;
  public codSprint: number;
  public nome: string;
  public descricao?: string;
  public tempoEstimado?: string;
  public dataEntrega?: string;
  public status?: number;
  public responsavel?: string | FuncionarioI;

  constructor(tarefa: TarefaI) {
    this.codTarefa = tarefa.codTarefa;
    this.codSprint = tarefa.codSprint;
    this.nome = tarefa.nome;
    this.descricao = tarefa.descricao;
    this.tempoEstimado = tarefa.tempoEstimado;
    this.dataEntrega = tarefa.dataEntrega;
    this.status = tarefa.status;
    this.responsavel = tarefa.responsavel;
  }

  static async buscarPorCodigo(codigo: number, camposFiltrados?: string[]) {
    let tarefa = await TarefaDAO.buscarPorCodigo(codigo);
    if (!tarefa) throw new NotFoundException('A tarefa');
    else return new TarefaModel(tarefa as TarefaI);
  }

  static listar = async () => {
    let listaTarefas = await TarefaDAO.listar();
    return listaTarefas?.map(tarefa => new TarefaModel(tarefa as TarefaI));
  }

  cadastrar = async () => {
    if (!this.codTarefa || !this.codSprint || !this.nome)
      throw new InvalidParametersException();
    await TarefaDAO.cadastrar(this);
  };

  alterar = async (codigo: number) => {
    if (!TarefaDAO.buscarPorCodigo(codigo)) {
      throw new NotFoundException('A tarefa não existe');
    }
    await TarefaDAO.alterar(this, codigo);
  };

  apagar = async (codigo: number) => {
    if (!TarefaDAO.buscarPorCodigo(codigo)) {
      throw new NotFoundException('A tarefa não existe');
    }
    await TarefaDAO.apagar(codigo);
  };
}
