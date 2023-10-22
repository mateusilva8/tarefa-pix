import { Router } from 'express';

import { CdController } from "../controllers/CdController"

let router: Router = Router();

let cdController: CdController = new CdController();

router.get('/cds', cdController.list);

router.post('/cds', cdController.create);

router.put('/cds/:id', cdController.update);

router.delete('/cds/:id', cdController.delete);

router.get('/cds/:id', cdController.find);

export default router;
