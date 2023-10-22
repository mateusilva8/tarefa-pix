import { Router } from 'express';

import { PessoaBeneficiarioController } from "../controllers/PessoaBeneficiarioController";

let router: Router = Router();

let pessoaBeneficiarioController: PessoaBeneficiarioController = new PessoaBeneficiarioController()

router.get('/categorias', categoriaController.list)

router.post('/categorias', categoriaController.create)

router.put('/categorias/:id', categoriaController.update)

router.delete('/categorias/:id', categoriaController.delete)

router.get('/categorias/:id', categoriaController.find)

export default router;
