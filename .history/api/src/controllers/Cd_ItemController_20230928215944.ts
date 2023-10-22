import {Response, Request} from 'express';
import { Cd_Item } from '../models/Cd_Item';
import { brotliDecompress } from 'zlib';
import { Cd } from '../models/Cd';
import { Item } from '../models/Item';
export class Cd_ItemController {

  async list (req: Request, res: Response): Promise<Response> {
    let cdItens: Cd_Item[] = await Cd_Item.find()

    return res.status(200).json(cdItens);
  }

  async find (req: Request, res: Response): Promise<Response>  {
    let id = Number(req.params.id);

    let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id});
    if (!cdItem) {
      return res.status(422).json({error: 'Item não encontrado no CD!'});
    } else {
      return res.status(200).json(cdItem);
    }
  }

  async create (req: Request, res: Response): Promise<Response>  {
    let body = req.body;

    let cd: Cd | null = await Cd.findOneBy({id: body.cds_idCd,});
    let item: Item | null = await Item.findOneBy({id: body.itens_idItem,});

    if (!cd) {
      return res.status(422).json({error: 'CD não encontrado!'});
    } else if(!item){
      return res.status(422).json({error: 'Item não encontrado!'});
    } else{
      let cdItem: Cd_Item = await Cd_Item.create({
        itens_idItem: body.itens_idItem,
        cds_idCd: body.cds_idCd,
        qtdade: body.qtdade,
        situacao: 'A',
      }).save();

      return res.status(200).json(cdItem);
    }
  }

  async update (req: Request, res: Response): Promise<Response>  {
    let body = req.body;
    let id = Number(req.params.id);

    let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id});
    if (!cdItem) {
      return res.status(422).json({error: 'Item não encontrado no CD!'});
    } else {
      cdItem.itens_idItem = body.itens_idItem,
      cdItem.cds_idCd = body.cds_idCd,
      cdItem.qtdade = body.qtdade
      await cdItem.save();
      return res.status(200).json(cdItem);
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id})
    if(!cdItem){
      return res.status(422).json({ error: 'Item não encontrado no CD! '})
    }

    cdItem.situacao = 'I'
    await cdItem.save()

    return res.status(200).json(`Item ID# ${cdItem.id} inativado com sucesso!`);
  }
}
