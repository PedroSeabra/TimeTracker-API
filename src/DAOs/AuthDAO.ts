import sequelize from 'sequelize';
import { TokenRecuperacaoSenha } from '../models/AuthModel.js';
import connection from '../database/index.js';
import { DatabaseException, InvalidTokenException } from '../utils/Errors.js';

const { STRING, DATE, Model } = sequelize;

export class AuthDAO {
  static buscarTokenSenha = async (token: string) => {
    const responseToken = await _TokenSenhaDAO.findOne({
      where: {
        token,
      },
    });
    if (!responseToken) throw new InvalidTokenException();
    else return responseToken.toJSON() as TokenRecuperacaoSenha;
  };

  static invalidarTokensSenhaPorEmail = async (email: string) => {
    return await _TokenSenhaDAO.destroy({
      where: {
        email: email,
      },
    });
  };

  static cadastrarTokenSenha = async (token: TokenRecuperacaoSenha) => {
    return await _TokenSenhaDAO
      .build(token)
      .save()
      .then(novoToken => novoToken.toJSON())
      .catch(e => {
        console.log('db-error: ', e);
        throw new DatabaseException();
      });
  };
}

class _TokenSenhaDAO extends Model {}

_TokenSenhaDAO.init(
  {
    token: {
      type: STRING(256),
      allowNull: false,
      primaryKey: true,
    },
    dataExpiracao: {
      type: DATE,
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    tableName: 'tokensrecsenha',
    freezeTableName: true,
    timestamps: false,
  }
);
