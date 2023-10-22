import { Response, Request } from "express";
import { Cd_Item } from "../models/Cd_Item";
import { Movimentacao } from "../models/Movimentacao";
import { PessoaBeneficiario } from "../models/PessoaBeneficiario";
import { Cd_ItemController } from "./Cd_ItemController";
export class MovimentacaoController {
  cdItemController = new Cd_ItemController();

  async list(req: Request, res: Response): Promise<Response> {
    let movimentacao: Movimentacao[] = await Movimentacao.find();

    return res.status(200).json(movimentacao);
  }

  async listEntradas(req: Request, res: Response): Promise<Response> {
    let movimentao: Movimentacao[] = await Movimentacao.find({
      where: {
        tipo: "E",
      },
    });
    return res.status(200).json(movimentao);
  }

  async listSaidas(req: Request, res: Response): Promise<Response> {
    let movimentao: Movimentacao[] = await Movimentacao.find({
      where: {
        tipo: "S",
      },
    });
    return res.status(200).json(movimentao);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({
      id,
    });
    if (!movimentacao) {
      return res.status(422).json({ error: "Movimentação não encontrada!" });
    } else {
      return res.status(200).json(movimentacao);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    if (body.pessoa_beneficiario_id == undefined) {
      body.pessoa_beneficiario_id = -1;
    }
    if (body.doador_nome == undefined) {
      body.doador_nome = -1;
    }
    console.log(body.pessoa_beneficiario_id);

    let beneficiario: PessoaBeneficiario | null =
      await PessoaBeneficiario.findOneBy({ id: body.pessoa_beneficiario_id });
    let cdItem: Cd_Item | null = await Cd_Item.findOneBy({
      itens_idItem: body.itens_idItem,
      cds_idCd: body.cds_idCd,
    });

    if (!cdItem) {
      cdItem = await Cd_Item.create({
        itens_idItem: body.itens_idItem,
        cds_idCd: body.cds_idCd,
        qtdade: Number(body.qtde),
        situacao: "A",
      }).save();
    }

    if (body.tipo == "E") {
      cdItem.qtdade += Number(body.qtde);
      cdItem.save();
    } else if (body.tipo == "S" && cdItem.qtdade >= body.qtde) {
      cdItem.qtdade -= Number(body.qtde);
      cdItem.save();
    } else if (body.tipo == "S" && cdItem.qtdade < body.qtde) {
      return res.status(422).json({ error: "Quantidade indisponivel!" });
    }
    console.log(beneficiario);

    let movimentacao: Movimentacao = await Movimentacao.create({
      tipo: body.tipo,
      doador_nome: body.doador_nome,
      pessoa_beneficiario_id: beneficiario?.id,
      cd_item_id: cdItem.id,
      qtde: body.qtde,
      situacao: "A",
    }).save();
    return res.status(200).json(movimentacao);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({
      id,
    });

    if (!movimentacao) {
      return res.status(422).json({ error: "Movimentação não encontrada!" });
    } else {
      let cdItem: Cd_Item | null = await Cd_Item.findOneBy({
        id: movimentacao.cd_item_id,
      });
      if (!cdItem) {
        return res.status(422).json({ error: "Item não encontrado no CD" });
      } else if (movimentacao.qtde > cdItem.qtdade) {
        return res
          .status(422)
          .json({ error: "Quantidade não disponivel no CD" });
      } else {
        (cdItem.qtdade += movimentacao.qtde),
          (cdItem.qtdade -= body.qtde),
          cdItem.save();
        (movimentacao.tipo = body.tipo),
          (movimentacao.doador_nome = body.doador_nome),
          (movimentacao.pessoa_beneficiario_id = body.pessoa_beneficiario_id),
          (movimentacao.cd_item_id = body.cd_item_id),
          (movimentacao.qtde = body.qtdade),
          await movimentacao.save();
        return res.status(200).json(movimentacao);
      }
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({
      id,
    });
    if (!movimentacao) {
      return res.status(422).json({ error: "Movimentação não encontrada! " });
    }

    movimentacao.situacao = "I";
    await movimentacao.save();

    return res
      .status(200)
      .json(`Movimentação ID# ${movimentacao.id} inativada com sucesso!`);
  }
}
