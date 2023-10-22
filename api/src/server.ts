import express, { Express } from 'express';
import cors from 'cors';
import pixRoutes from './routes/pix'


let server: Express = express();
let port: number = Number(3000)

server.use(cors());
server.use(express.json());
server.use(pixRoutes);

export default {
  start(){
    server.listen(port, () =>{
      console.log(`Server started on port ${port}`);
    })
  }
}
