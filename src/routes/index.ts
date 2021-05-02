import express from 'express';
import connection from '../database/index.js';
import { Funcionario } from '../models/Funcionario.js';

const routes = express.Router();

routes.get('/', (req, res) => {
  //Tenta conectar ao banco e retorna o resultado para o cliente
  connection
    .authenticate()
    .then(async () => {
      console.log('Connection has been established successfully.');
      try {
        await Funcionario.build({
          cpf: '46879049800',
          nome: 'Pedro Siqueira',
          dataCadastro: '2021-05-02',
          email: 'pedro@bol.com',
          senha: '123456',
        }).save();
        const funcList = await Funcionario.findAll();
        funcList.map(v => console.log(v));
      } catch (e) {
        console.log(e);
      }
    })
    .catch((e: any) => res.send('Unable to connect to the database:' + e));
});

export default routes;
