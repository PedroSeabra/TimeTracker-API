import bcrypt from 'bcrypt';
import dotEnv from 'dotenv-safe';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const gerarSenha = async (senha: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(senha, saltRounds);
};

export const gerarTokenJwt = (
  payload: object,
  secondsToExpire: number = 600
) => {
  dotEnv.config();
  return jwt.sign(payload, process.env.SECRET!, {
    expiresIn: secondsToExpire,
  });
};

export const gerarTokenOpaco = () => crypto.randomBytes(28).toString('hex');
