import { Router } from 'express';

import { PessoaBeneficiarioController } from "../controllers/PessoaBeneficiarioController";

let router: Router = Router();

let pessoaBeneficiarioController: PessoaBeneficiarioController = new PessoaBeneficiarioController()

router.get('/beneficiarios', pessoaBeneficiarioController.list)

router.post('/beneficiarios', pessoaBeneficiarioController.create)

router.put('/beneficiarios/:id', pessoaBeneficiarioController.update)

router.delete('/beneficiarios/:id', pessoaBeneficiarioController.delete)

router.get('/beneficiarios/:id', pessoaBeneficiarioController.find)

export default router;
