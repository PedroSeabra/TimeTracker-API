import bcrypt from 'bcrypt';

export const gerarSenha = async (senha: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(senha, saltRounds);
}
