import { Router } from "express";
import express, {Request, Response} from 'express';


let router: Router = Router();

async function listarUsuarios(req: Request, res: Response): Promise<Response> {
  let resposta = await fetch('http://177.44.248.24/pix-api/users');
  let listaUsuarios = await resposta.json();

  return res.status(200).json(listaUsuarios);
}

async function listarPix(req: Request, res: Response): Promise<Response> {
  let resposta = await fetch('http://177.44.248.24/pix-api/pix')
  let listaPix = await resposta.json();

  return res.status(200).json(listaPix);
}

async function listarPixUsuario(req: Request, res: Response): Promise<Response> {
  let body = req.body;

  let userId = body.userId;
  let type = body.type;

  let resposta = await fetch(`http://177.44.248.24/pix-api/pix/${userId}/${type}`);

  let listaPix = resposta.json();

  return res.status(200).json(listaPix);
}

async function realizarPix(req: Request, res: Response): Promise<Response> {
  let payload = {
    senderId: 0,
    recipientId: 2,
    value: 10,
  };

  console.log(JSON.stringify(payload));

  let resposta = await fetch('http://177.44.248.24/pix-api/pix', {
    method: 'POST',
    headers: {
        "Content-type" : 'application/json',
        "Acccept": 'appplication/json'
    },
    body: JSON.stringify(payload)
  });

  let recibo = await resposta.json();

  return res.status(200).json(recibo);
}


router.get("/pix-api/usuarios", listarUsuarios);
router.get("/pix-api/pix", listarPix);
router.get("/pix-api/pix", listarPixUsuario);
router.post("/pix-api/pix", realizarPix);


export default router;
