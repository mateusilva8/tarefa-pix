import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

let router: Router = Router();

let usuariosController: UsuarioController = new UsuarioController();

router.get("/usuarios", usuariosController.list);

router.post("/usuarios", usuariosController.create);

router.put("/usuarios/:id", usuariosController.update);

router.delete("/usuarios/:id", usuariosController.delete);

router.get("/usuarios/:id", usuariosController.find);

router.post("/login/", usuariosController.login);

export default router;
