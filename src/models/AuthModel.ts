import { ExpiredTokenException } from '../utils/Errors.js';
import { AuthDAO } from '../DAOs/AuthDAO.js';
import { gerarTokenOpaco } from '../utils/auth.js';

export interface TokenRecuperacaoSenha {
  token: string;
  email: string;
  dataExpiracao: string;
}

export class AuthModel {
  static cadastrarTokenRecuperacaoSenha = async (email: string) => {
    await AuthDAO.invalidarTokensSenhaPorEmail(email);
    const dataExpiracao = new Date(Date.now() + 1800 * 1000);
    return (await AuthDAO.cadastrarTokenSenha({
      token: gerarTokenOpaco(),
      dataExpiracao:
        dataExpiracao.toLocaleDateString().split('/').reverse().join('-') +
        ' ' +
        dataExpiracao.toLocaleTimeString(),
      email,
    })) as TokenRecuperacaoSenha;
  };

  static buscarTokenRecuperacaoSenha = async (tokenFornecido: string) => {
    const token = await AuthDAO.buscarTokenSenha(tokenFornecido);
    if (new Date(token.dataExpiracao) > new Date())
      throw new ExpiredTokenException();
    return token;
  };
}
