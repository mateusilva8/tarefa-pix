import { Router } from "express";
import express, {Request, Response} from 'express';


let router: Router = Router();

async function listarUsuarios(req: Request, res: Response): Promise<Response> {
  let listaUsuarios = await fetch('http://177.44.248.24/pix-api/users');

  console.log(listaUsuarios.body);

  return res.status(200).json(listaUsuarios);
}


router.get("/pix-api/usuarios", listarUsuarios );


export default router;