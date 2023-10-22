import { Router } from "express";

import { Cd_ItemController } from "../controllers/Cd_ItemController";

let router: Router = Router();

let cidadesController: Cd_ItemController = new Cd_ItemController();

router.get("/cdItens", cidadesController.list);

router.post("/cdItens", cidadesController.create);

router.put("/cdItens/:id", cidadesController.update);

router.delete("/cdItens/:id", cidadesController.delete);

router.get("/cdItens/:id", cidadesController.find);

router.get("/itensdocd", cidadesController.listId);

export default router;
