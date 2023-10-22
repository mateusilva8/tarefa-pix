import { Categoria } from "../models/Categoria";
import { Item } from "../models/Item";
import { Response, Request } from "express";

export class ItemController {
  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let categoria: Categoria | null = await Categoria.findOneBy({
      id: req.body.categorias_idCategoria,
    });
    if (categoria) {
      let item: Item = await Item.create({
        nome: body.nome,
        categorias_idCategoria: categoria.id,
        situacao: "A",
      }).save();
      return res.status(200).json(item);
    } else {
      return res.status(422).json({ error: "Categoria não encontrada! " });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    let itens: Item[] = await Item.findBy({ situacao: "A" });
    return res.status(200).json(itens);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let item: Item | null = await Item.findOneBy({ id });
    if (!item) {
      return res.status(422).json({ error: "Item não encontrado! " });
    }
    let retorno = {
      nome: item.nome,
      categoria: item.categoria.nome,
      idCategoria: item.categoria.id,
    };
    return res.status(200).json(retorno);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let item: Item | null = await Item.findOneBy({ id });
    if (!item) {
      return res.status(422).json({ error: "Item não encontrado! " });
    } else {
      let categoria: Categoria | null = await Categoria.findOneBy({
        id: req.body.categorias_idCategoria,
      });
      if (categoria) {
        console.log(body.categorias_idCategoria);

        (item.nome = body.nome),
          (item.categoria.id = body.categorias_idCategoria);
        await item.save();
      } else {
        return res.status(422).json({ error: "Categoria não encontrada! " });
      }
    }

    return res.status(200).json(item);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let item: Item | null = await Item.findOneBy({ id });
    if (!item) {
      return res.status(422).json({ error: "Cidade não encontrada! " });
    }

    item.situacao = "I";
    await item.save();

    return res.status(200).json(`Item ID# ${item.id} inativado com sucesso!`);
  }
}
