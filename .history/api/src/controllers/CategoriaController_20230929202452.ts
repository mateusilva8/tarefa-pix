import {Response, Request} from 'express';
import { Categoria } from '../models/Categoria';
export class CategoriaController {

  async list (req: Request, res: Response): Promise<Response> {
    let produtos: Categoria[] = await Categoria.find()

    return res.status(200).json(produtos);
  }

  async find (req: Request, res: Response): Promise<Response>  {
    let id = Number(req.params.id);

    let categoria: Categoria | null = await Categoria.findOneBy({id});
    if (!categoria) {
      return res.status(422).json({error: 'Categoria não encontrada!'});
    } else {
      return res.status(200).json(categoria);
    }
  }

  async create (req: Request, res: Response): Promise<Response>  {
    let body = req.body;

    let categoria: Categoria = await Categoria.create({
      nome: body.nome,
      situacao: 'A',
    }).save();

    return res.status(200).json(categoria);
  }

  async update (req: Request, res: Response): Promise<Response>  {
    let body = req.body;
    let id = Number(req.params.id);

    let categoria: Categoria | null = await Categoria.findOneBy({id});
    if (!categoria) {
      return res.status(422).json({error: 'Categoria não encontrada!'});
    } else {
      categoria.nome = body.nome
      categoria.situacao = body.situacao
      await categoria.save();
      return res.status(200).json(categoria);
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let categoria: Categoria | null = await Categoria.findOneBy({id})
    if(!categoria){
      return res.status(422).json({ error: 'Categoria não encontrada! '})
    }

    categoria.situacao = 'I'
    await categoria.save()

    return res.status(200).json(`Categoria ID# ${categoria.id} inativado com sucesso!`);
  }
}
