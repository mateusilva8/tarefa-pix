import { Router } from "express";

import { MovimentacaoController } from "../controllers/MovimentacaoController";

let router: Router = Router();

let movimentacaoController: MovimentacaoController =
  new MovimentacaoController();

router.get("/movimentacoes", movimentacaoController.list);

router.get("/movimentacoesEntrada", movimentacaoController.listEntradas);

router.get("/movimentacoesSaida", movimentacaoController.listSaidas);

router.post("/movimentacoes", movimentacaoController.create);

router.put("/movimentacoes/:id", movimentacaoController.update);

router.delete("/movimentacoes/:id", movimentacaoController.delete);

router.get("/movimentacoes/:id", movimentacaoController.find);

export default router;
