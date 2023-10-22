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

  let listaPix =  await resposta.json();


  return res.status(200).json(listaPix);
}

async function realizarPix(req: Request, res: Response): Promise<Response> {
  let body = req.body;

  let payload = {
    senderId: body.senderId,
    recipientId: body.recipientId,
    value: body.value,
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

  if (resposta.ok) {
    return res.status(200).json(recibo);
  }

  return res.status(501).json({error:'Erro ao enviar'})
}


router.get("/pix-api/usuarios", listarUsuarios);
router.get("/pix-api/pix", listarPix);
router.post("/pix-api/pix/usuarios", listarPixUsuario);
router.post("/pix-api/pix", realizarPix);


export default router;
