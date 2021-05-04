import express from 'express';
import connection from '../database/index.js';
import { Funcionario } from '../models/Funcionario.js';
import { gerarSenha } from '../utils/auth.js';

const routes = express.Router();

/**
 * Recuperação de todos os funcionários cadastrados
 */
routes.get('/funcionarios', (req, res) => {
  //Conexão com o banco de dados
  connection
    .authenticate()
    .then(async () => {
      // Conexão com o banco de dados realizada com sucesso.
      console.log('Connection has been established successfully.');
      try {
        // Recuperação de todos os registros da tabela
        const funcList = await Funcionario.findAll();
        // Retorno dos resultados encontrados
        res.json(funcList);
      } catch (e) {
        console.log(e);
      }
    })
    // Ocorreu algum erro ao conectar com o banco de dados.
    .catch((e: any) => res.send('Unable to connect to the database:' + e));
});

routes.post('/funcionarios/cadastro', (req, res) => {
  connection
    .authenticate()
    .then(async () => {
      try {
        const post = req.body;
        const userSenha = await gerarSenha(post.senha);
        const novoFuncionario = await Funcionario.build({
          cpf: post.cpf,
          nome: post.nome,
          dataCadastro: post.dataCadastro,
          email: post.email,
          senha: userSenha,
        });
        novoFuncionario.save().then(function (funcionario) {
          res.json(funcionario);
        }).catch(function (e) {
          console.log(e);
        });
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e: any) => res.send('Unable to connect to the database:' + e));
});

export default routes;
