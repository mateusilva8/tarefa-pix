import { hash } from "bcrypt";
import bcrypt from "bcrypt";
import { Usuario } from "../models/Usuario";
import { Request, Response } from "express";

export class UsuarioController {
  public usuarioLogin: Usuario | null;

  async login(req: Request, res: Response): Promise<Response> {
    const body = req.body;
    const emailUsuario = body.email;
    const senhaUsuario = body.senha;

    let loginOk = await Usuario.findOne({
      where: {
        email: emailUsuario,
        situacao: "A",
      },
    });

    if (loginOk) {
      const match = await bcrypt.compare(senhaUsuario, loginOk.senha);
      if (match) {
        this.usuarioLogin = loginOk;
        return loginOk;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    const passwordHash = await hash(body.senha, 8);

    let usuario = await Usuario.create({
      nome: body.nome,
      senha: passwordHash,
      email: body.email,
      situacao: "A",
    }).save();
    return res.status(200).json(usuario);
  }

  async list(req: Request, res: Response): Promise<Response> {
    let users: Usuario[] = await Usuario.findBy({
      situacao: "A",
    });
    return res.status(200).json(users);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let usuario: Usuario | null = await Usuario.findOneBy({ id });
    if (!usuario) {
      return res.status(422).json({ error: "Usuário não encontrado! " });
    }

    return res.status(200).json(usuario);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    const passwordHash = await hash(body.senha, 8);

    let usuario: Usuario | null = await Usuario.findOneBy({ id });
    if (!usuario) {
      return res.status(422).json({ error: "Usuário não encontrado! " });
    }

    (usuario.nome = body.nome),
      (usuario.email = body.email),
      (usuario.senha = passwordHash);
    await usuario.save();

    return res.status(200).json(usuario);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let usuario: Usuario | null = await Usuario.findOneBy({ id });
    if (!usuario) {
      return res.status(422).json({ error: "Usuário não encontrado! " });
    }

    usuario.situacao = "I";
    await usuario.save();

    return res
      .status(200)
      .json(`Usuário ID# ${usuario.id} inativado com sucesso!`);
  }
}
