import express from 'express';
import connection from '../database/index.js';
import { Funcionario, FuncionarioI } from '../models/Funcionario.js';
import dotEnv from 'dotenv-safe';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const routes = express.Router();

routes.post('/login', (req, res) => {
  dotEnv.config();
  connection
    .authenticate()
    .then(async () => {
      const { email, senha } = req.body as FuncionarioI;
      const funcionario = await Funcionario.findOne({
        where: {
          'email': email
        }
      });
      if (funcionario) {
        const match = bcrypt.compare(senha, funcionario.senha);
        if (match) {
          const token = jwt.sign({ cpf: funcionario.cpf }, process.env.SECRET!, {
            expiresIn: 300 // expires in 5min
          });
          res.json({ auth: true, token: token });
        }
      }
    })
    .catch((e: any) => res.send('Unable to connect to the database:' + e));
});

export default routes;
