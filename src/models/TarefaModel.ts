import { FuncionarioI } from './FuncionarioModel.js';

export interface Tarefa {
  codTarefa: number;
  codSprint: number;
  nome: string;
  descricao?: string;
  tempoEstimado?: string;
  dataEntrega?: string;
  status?: number;
  responsavel?: string | FuncionarioI;
}

export class AuthModel {
  static cadastrarTarefa = async (tarefa: Tarefa) => {
    //implementar
  };
}
