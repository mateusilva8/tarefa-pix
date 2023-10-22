import express, { Express } from 'express';
import cors from 'cors';
import usuariosRoutes from '././routes/usuarios';
import categoriasRoutes from '././routes/categorias';
import cidadesRoutes from '././routes/cidades';
import itensRoutes from '././routes/itens';
import cdItemRoutes from '././routes/cdItem';
import cdsRoutes from '././routes/cds';
import pessoasBeneficiariosRoutes from '././routes/pessoasBeneficiarios';
import movimentacoesRoutes from '././routes/movimentacoes';


let server: Express = express();
let port: number = Number(process.env.SERVER_PORT || 3000)

server.use(cors());
server.use(express.json());

server.use(usuariosRoutes);
server.use(categoriasRoutes);
server.use(cidadesRoutes);
server.use(itensRoutes);
server.use(cdItemRoutes);
server.use(cdsRoutes);
server.use(pessoasBeneficiariosRoutes);
server.use(movimentacoesRoutes);

export default {
  start(){
    server.listen(port, () =>{
      console.log(`Server started on port ${port}`);
    })
  }
}
