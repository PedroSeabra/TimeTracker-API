import sequelize from 'sequelize';
import connection from '../database/index.js';
import { DatabaseException } from '../utils/Errors.js';
import { _FuncionarioDAO } from './FuncionarioDAO.js';
import { TarefaI } from '../models/TarefaModel.js';

const { STRING, DATE, Model, INTEGER, TIME } = sequelize;

export class TarefaDAO {
  static cadastrar = async (tarefa: TarefaI) => {
    return await _TarefaDAO
      .build(tarefa)
      .save()
      .then(novaTarefa => novaTarefa.toJSON())
      .catch(e => {
        console.log('db-error: ', e);
        throw new DatabaseException();
      });
  };
}

class _TarefaDAO extends Model {}

_TarefaDAO.init(
  {
    codTarefa: {
      type: INTEGER({ length: 12 }),
      allowNull: false,
      primaryKey: true,
    },
    codSprint: {
      type: INTEGER({ length: 12 }),
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: STRING(70),
      allowNull: false,
    },
    descricao: {
      type: STRING(1200),
      allowNull: true,
    },
    tempoEstimado: {
      type: TIME,
      allowNull: true,
    },
    dataEntrega: {
      type: DATE,
      allowNull: true,
    },
    status: {
      type: INTEGER({ length: 1 }),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: 'tarefa',
    freezeTableName: true,
    timestamps: false,
  }
);

_TarefaDAO.belongsTo(_FuncionarioDAO, {
  foreignKey: {
    name: 'responsavel',
    allowNull: true,
  },
});