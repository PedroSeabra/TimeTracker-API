import { gerarSenha } from '../utils/auth.js';
import { FuncionarioDAO } from '../DAOs/FuncionarioDAO.js';
import {
  CreateException,
  InvalidParametersException,
  NotFoundException,
} from '../utils/Errors.js';

export interface FuncionarioI {
  cpf: string;
  nome: string;
  dataCadastro: string;
  email: string;
  senha: string;
}

export class FuncionarioModel implements FuncionarioI {
  public cpf: string;
  public nome: string;
  public dataCadastro: string;
  public email: string;
  public senha: string;

  constructor(funcionario: FuncionarioI) {
    this.cpf = funcionario.cpf;
    this.nome = funcionario.nome;
    this.dataCadastro = funcionario.nome;
    this.email = funcionario.email;
    this.senha = funcionario.senha;
  }

  static listar = async () => {
    let listaFuncionarios = await FuncionarioDAO.listar();
    console.log(listaFuncionarios);
    return listaFuncionarios?.map(
      funcionario => new FuncionarioModel(funcionario as FuncionarioI)
    );
  };

  static async buscarPorEmail(email: string, camposFiltrados?: string[]) {
    let funcionario = await FuncionarioDAO.buscarPorEmail(email);
    if (!funcionario) throw new NotFoundException('O usuário');
    else return new FuncionarioModel(funcionario as FuncionarioI);
  }

  cadastrar = async () => {
    if (!this.cpf || !this.email || !this.senha || !this.nome)
      throw new InvalidParametersException();
    if (
      (await FuncionarioDAO.buscarPorEmail(this.email)) ||
      (await FuncionarioDAO.buscarPorCpf(this.cpf))
    ) {
      throw new CreateException('O usuário');
    }
    this.senha = await gerarSenha(this.senha);
    await FuncionarioDAO.cadastrar(this);
  };

  alterar = async () => {
    if (!FuncionarioModel.buscarPorEmail(this.email))
      throw new NotFoundException('O usuário não existe');
    this.senha = await gerarSenha(this.senha);
    await FuncionarioDAO.alterar(this);
  };
}
