import express from 'express';
import {
  authRoutes,
  funcionariosRoutes,
  tarefasRoutes,
} from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/funcionarios', funcionariosRoutes);
app.use('/tarefas', tarefasRoutes);

app.listen(3300);
