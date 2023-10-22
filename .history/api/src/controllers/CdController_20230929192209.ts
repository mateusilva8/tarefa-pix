import {Response, Request} from 'express';
import { Cd } from '../models/Cd';
export class CdController {

  async list (req: Request, res: Response): Promise<Response> {
    let cds: Cd[] = await Cd.find()

    return res.status(200).json(cds);
  }

  async find (req: Request, res: Response): Promise<Response>  {
    let id = Number(req.params.id);

    let cd: Cd | null = await Cd.findOneBy({id});
    if (!cd) {
      return res.status(422).json({error: 'CD não encontrado!'});
    } else {
      return res.status(200).json(cd);
    }
  }

  async create (req: Request, res: Response): Promise<Response>  {
    let body = req.body;

    let cd: Cd = await Cd.create({
      nome: body.nome,
      cidades_idCidade: body.cidades_idCidade,
      situacao: 'A',
    }).save();

    return res.status(200).json(cd);
  }

  async update (req: Request, res: Response): Promise<Response>  {
    let body = req.body;
    let id = Number(req.params.id);

    let cd: Cd | null = await Cd.findOneBy({id});
    if (!cd) {
      return res.status(422).json({error: 'CD não encontrado!'});
    } else {
      cd.nome = body.nome;
      cd.cidades_idCidade = body.cidades_idCidade;
      cd.situacao = body.situacao;
      await cd.save();
      return res.status(200).json(cd);
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let cd: Cd | null = await Cd.findOneBy({id})
    if(!cd){
      return res.status(422).json({ error: 'CD não encontrado! '})
    }

    cd.situacao = 'I'
    await cd.save()

    return res.status(200).json(`CD ID# ${cd.id} inativado com sucesso!`);
  }
}
