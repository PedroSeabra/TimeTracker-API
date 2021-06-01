import { TarefaDAO } from '../DAOs/TarefaDAO.js';
import { InvalidParametersException } from '../utils/Errors.js';
import { FuncionarioI } from './FuncionarioModel.js';

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

  cadastrar = async () => {
    if (!this.codTarefa || !this.codSprint || !this.nome)
      throw new InvalidParametersException();
    await TarefaDAO.cadastrar(this);
  };
}
