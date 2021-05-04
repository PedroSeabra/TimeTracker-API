import express from 'express';
import routes from './routes/login.js';
import routesFuncionairos from './routes/funcionarios.js';

const app = express();

app.use(express.json());
app.use(routes);
app.use(routesFuncionairos);

app.listen(3300);
