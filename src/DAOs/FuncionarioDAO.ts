import sequelize from 'sequelize';
import { FuncionarioI } from '../models/FuncionarioModel.js';
import connection from '../database/index.js';
import { DatabaseException } from '../utils/Errors.js';

const { STRING, DATEONLY, Model } = sequelize;

export class FuncionarioDAO {
  static buscarPorCpf = async (cpf: string) => {
    let funcionarioEncontrado = await _FuncionarioDAO.findOne({
      where: {
        cpf: cpf,
      },
    });
    if (funcionarioEncontrado) return funcionarioEncontrado.toJSON();
    else return null;
  };

  static buscarPorEmail = async (email: string) => {
    let funcionarioEncontrado = await _FuncionarioDAO.findOne({
      where: {
        email: email,
      },
    });
    if (funcionarioEncontrado) return funcionarioEncontrado.toJSON();
    else return null;
  };

  static listar = async () => {
    let funcionarios = await _FuncionarioDAO.findAll();
    return funcionarios.map(funcionario => funcionario.toJSON());
  };

  static cadastrar = async (funcionario: FuncionarioI) => {
    return await _FuncionarioDAO
      .build(funcionario)
      .save()
      .then(funcionario => funcionario.toJSON())
      .catch(e => {
        console.log('db-error: ', e);
        throw new DatabaseException();
      });
  };

  static alterar = async (funcionario: FuncionarioI, funcionarioEmail: string) => {
    return await _FuncionarioDAO
      .update(funcionario, {
        where: { email: funcionarioEmail }
      })
      .then(queryInfo => queryInfo[0])
      .catch(e => {
        console.log('db-error: ', e);
        throw new DatabaseException();
      });
  };
}

class _FuncionarioDAO extends Model { }

_FuncionarioDAO.init(
  {
    cpf: {
      type: STRING(11),
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: STRING(50),
      allowNull: false,
    },
    dataCadastro: {
      type: DATEONLY,
      allowNull: false,
    },
    senha: {
      type: STRING(30),
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'funcionarios',
    freezeTableName: true,
    timestamps: false,
  }
);
