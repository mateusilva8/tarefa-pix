import { Response, Request } from "express";
import { PessoaBeneficiario } from "../models/PessoaBeneficiario";
import { builtinModules } from "module";
export class PessoaBeneficiarioController {
  async list(req: Request, res: Response): Promise<Response> {
    let beneficiario: PessoaBeneficiario[] = await PessoaBeneficiario.find();
    let retorno = beneficiario.map((beneficiario) => {
      return {
        id: beneficiario.id,
        nome: beneficiario.nome,
        cpf: beneficiario.cpf,
        data_nascimento: beneficiario.data_nascimento,
        idCidade: beneficiario.cidade.id,
        nomeCidade: beneficiario.cidade.nome,
      };
    });

    return res.status(200).json(beneficiario);
  }
  // let itens: Item[] = await Item.find();
  // let retorno = itens.map((item) => {
  //   return {
  //     id: item.id,
  //     nome: item.nome,
  //     categoria: item.categoria.nome,
  //     idCategoria: item.categoria.id,
  //     situacao: item.situacao,
  //   };
  // });
  // return res.status(200).json(retorno);
  async find(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let beneficiario: PessoaBeneficiario | null =
      await PessoaBeneficiario.findOneBy({ id });
    if (!beneficiario) {
      return res.status(422).json({ error: "Beneficiário não encontrado!" });
    } else {
      return res.status(200).json(beneficiario);
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let beneficiario: PessoaBeneficiario = await PessoaBeneficiario.create({
      nome: body.nome,
      cpf: body.cpf,
      data_nascimento: body.dataNascimento,
      cidades_id_cidade: body.cidades_id_cidade,
      situacao: "A",
    }).save();

    return res.status(200).json(beneficiario);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let id = Number(req.params.id);

    let beneficiario: PessoaBeneficiario | null =
      await PessoaBeneficiario.findOneBy({ id });
    if (!beneficiario) {
      return res.status(422).json({ error: "Beneficiário não encontrado!" });
    } else {
      (beneficiario.nome = body.nome),
        (beneficiario.cpf = body.cpf),
        (beneficiario.data_nascimento = body.dataNascimento),
        (beneficiario.cidades_id_cidade = body.cidades_id_cidade),
        await beneficiario.save();
      return res.status(200).json(beneficiario);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);

    let beneficiario: PessoaBeneficiario | null =
      await PessoaBeneficiario.findOneBy({ id });
    if (!beneficiario) {
      return res.status(422).json({ error: "Beneficiário não encontrado! " });
    }

    beneficiario.situacao = "I";
    await beneficiario.save();

    return res
      .status(200)
      .json(`Beneficiário ID# ${beneficiario.id} inativado com sucesso!`);
  }
}