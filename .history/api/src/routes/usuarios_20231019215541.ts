import { Router } from "express";

let router: Router = Router();

async function listarUsuarios(req: Request, res: Response) {
  let listaUsuarios = await fetch('http://177.44.248.24/pix-api/users');

  return res.status(200).json(listaUsuarios);
}


router.get("/pix-api/usuarios", listarUsuarios );


export default router;
