import sequelize from 'sequelize';
import connection from '../database/index.js';

const { STRING, DATEONLY, Model } = sequelize;

export interface FuncionarioI {
  cpf: string;
  nome: string;
  dataCadastro: string;
  email: string;
  senha: string;
}

export class Funcionario extends Model<FuncionarioI> implements FuncionarioI {
  public cpf!: string;
  public nome!: string;
  public email!: string;
  public dataCadastro!: string;
  public senha!: string;
}

Funcionario.init(
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
