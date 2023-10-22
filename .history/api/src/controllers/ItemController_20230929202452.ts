import { Categoria } from "../models/Categoria";
import { Item } from "../models/Item";
import {Response, Request} from 'express';

export class ItemController{

  async create (req: Request, res: Response): Promise<Response>  {
    let body = req.body;
    let categoria: Categoria | null = await Categoria.findOneBy({id: req.body.categorias_idCategoria});
    if(categoria){
      let item: Item = await Item.create({
        nome: body.nome,
        categorias_idCategoria: categoria.id,
        // situacao: 'A',
      }).save();
      return res.status(200).json(item);
    } else{
      return res.status(422).json({ error: 'Categoria não encontrada! '})
    }
  }

  async list(req: Request, res: Response):Promise<Response> {
    let item: Item[] = await Item.find()
    return res.status(200).json(item)
  }

  async find (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let item: Item|null = await Item.findOneBy({id})
    if(! item){
      return res.status(422).json({ error: 'Item não encontrado! '})
    }

    return res.status(200).json(item);
  }

  async update (req: Request, res: Response): Promise<Response>{
    let body = req.body
    let id = Number(req.params.id)

    let item: Item|null = await Item.findOneBy({id})
    if(! item){
      return res.status(422).json({ error: 'Item não encontrado! '})
    } else{
      let categoria: Categoria | null = await Categoria.findOneBy({id: req.body.categorias_idCategoria});
      if(categoria){
        item.nome = body.nome,
        item.categorias_idCategoria = categoria.id
        await item.save()
      } else{
        return res.status(422).json({ error: 'Categoria não encontrada! '})
      }
    }

    return res.status(200).json(item);
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let item: Item|null = await Item.findOneBy({id})
    if(! item){
      return res.status(422).json({ error: 'Cidade não encontrada! '})
    }

    item.situacao = 'I'
    await item.save()

    return res.status(200).json(`Item ID# ${item.id} inativado com sucesso!`);
  }
}
