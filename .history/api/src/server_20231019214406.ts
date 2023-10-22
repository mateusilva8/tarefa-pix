import express, { Express } from 'express';
import cors from 'cors';

let server: Express = express();
let port: number = Number(3000)

server.use(cors());
server.use(express.json());


export default {
  start(){
    server.listen(port, () =>{
      console.log(`Server started on port ${port}`);
    })
  }
}
