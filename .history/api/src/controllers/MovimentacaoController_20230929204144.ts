import {Response, Request} from 'express';
import { Cd_Item } from '../models/Cd_Item';
import { Cd } from '../models/Cd';
import { Item } from '../models/Item';
import { Movimentacao } from '../models/Movimentacao';
import { PessoaBeneficiario } from '../models/PessoaBeneficiario';
import { builtinModules } from 'module';
export class MovimentacaoController {

  async list (req: Request, res: Response): Promise<Response> {
    let movimentacao: Movimentacao[] = await Movimentacao.find()

    return res.status(200).json(movimentacao);
  }

  async find (req: Request, res: Response): Promise<Response>  {
    let id = Number(req.params.id);

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({id});
    if (!movimentacao) {
      return res.status(422).json({error: 'Movimentação não encontrada!'});
    } else {
      return res.status(200).json(movimentacao);
    }
  }

  async create (req: Request, res: Response): Promise<Response>  {
    let body = req.body;

    let beneficiario: PessoaBeneficiario | null = await PessoaBeneficiario.findOneBy({id: body.pessoa_beneficiario_id})
    let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id: body.cd_item_id,});


      if (body.tipo == 'S' && cdItem) {
        if(cdItem.qtdade < body.qtde){
          return res.status(422).json({error: 'Quantidade não disponivel no CD'});
        } else if(!beneficiario){
          return res.status(422).json({error: 'Beneficiário não encontrado!'});
        } else if (body.tipo == 'S' && cdItem) {
          cdItem.qtdade -= body.qtde;
          await cdItem.save();
          let movimentacao: Movimentacao = await Movimentacao.create({
            tipo: body.tipo,
            doador_nome: body.doadorNome,
            pessoa_beneficiario_id: body.pessoa_beneficiario_id,
            cd_item_id: body.cd_item_id,
            qtde: body.qtde,
            situacao: 'A'
          }).save();
          return res.status(200).json(movimentacao);
        }
      }

    if (!cdItem) {
      return res.status(422).json({error: 'Item não encontrado no CD!'});
    } else if(!beneficiario){
      return res.status(422).json({error: 'Beneficiário não encontrado!'});
    } else{
      let movimentacao: Movimentacao = await Movimentacao.create({
        tipo: body.tipo,
        doador_nome: body.doadorNome,
        pessoa_beneficiario_id: body.pessoa_beneficiario_id,
        cd_item_id: body.cd_item_id,
        qtde: body.qtde,
        situacao: 'A'
      }).save();

      return res.status(200).json(movimentacao);
    }
  }

  async update (req: Request, res: Response): Promise<Response>  {
    let body = req.body;
    let id = Number(req.params.id);

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({id});

    if (!movimentacao) {
      return res.status(422).json({error: 'Movimentação não encontrada!'});
    } else {
      let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id: movimentacao.cd_item_id})
      if (!cdItem) {
        return res.status(422).json({error: 'Item não encontrado no CD'});
      }else if (movimentacao.qtde > cdItem.qtdade) {
        return res.status(422).json({error: 'Item não encontrado no CD'});

      }
      else {

          movimentacao.tipo = body.tipo,
          movimentacao.doador_nome = body.doador_nome,
          movimentacao.pessoa_beneficiario_id = body.pessoa_beneficiario_id,
          movimentacao.cd_item_id = body.cd_item_id,
          movimentacao.qtde = body.qtdade,
          await movimentacao.save();
          return res.status(200).json(movimentacao);
        }
      }
    }
  }


  async delete (req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id)

    let movimentacao: Movimentacao | null = await Movimentacao.findOneBy({id})
    if(!movimentacao){
      return res.status(422).json({ error: 'Movimentação não encontrada! '})
    }

    movimentacao.situacao = 'I'
    await movimentacao.save()

    return res.status(200).json(`Movimentação ID# ${movimentacao.id} inativada com sucesso!`);
  }
}




// import { Cd_Item } from "../models/Cd_Item";
// import promptSync from 'prompt-sync';
// import { PessoaBeneficiario } from "../models/PessoaBeneficiario";
// import { Movimentacao } from "../models/Movimentacao";
// const prompt = promptSync();


// export class MovimentacaoController{

//   async create(tipo: string, doadorNome: string, pessoaBeneficiarioId: number, cdItemId: number , qtde: number): Promise<Movimentacao | null> {

//     let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id: cdItemId,});
//     let pessoaBeneficiario: PessoaBeneficiario | null = await PessoaBeneficiario.findOneBy({id: pessoaBeneficiarioId,});

//     if (!cdItem) {
//       console.log("ID do item não encontrado!");
//     } else if(!pessoaBeneficiario){
//       console.log("ID do beneficiário não encontrado!");
//     } else{
//       if (tipo == 'S') {
//         if(cdItem.qtdade < qtde){
//           console.log('Quantidade não disponivel no CD')
//         } else {
//           cdItem.qtdade -= qtde;
//           await cdItem.save();
//           return await Movimentacao.create({
//             tipo: tipo,
//             doador_nome: doadorNome,
//             pessoa_beneficiario_id: pessoaBeneficiarioId,
//             cd_item_id: cdItemId,
//             qtde: qtde,
//             situacao: 'A'
//           }).save()
//         }
//       } else if(tipo == 'E'){
//         cdItem.qtdade += qtde;
//         await cdItem.save();
//         return await Movimentacao.create({
//           tipo: tipo,
//           doador_nome: doadorNome,
//           pessoa_beneficiario_id: pessoaBeneficiarioId,
//           cd_item_id: cdItemId,
//           qtde: qtde,
//           situacao: 'A'
//         }).save()
//       }
//     }
//     return null;
//   }

//   async list (): Promise<Movimentacao[]>{
//     return await Movimentacao.find();
//   }

//   async find(id: number): Promise<Movimentacao|null>{
//     return await Movimentacao.findOneBy({id})
//   }

//   async edit(movimentacao: Movimentacao | null , tipo: string, doadorNome: string, pessoaBeneficiarioId: number, cdItemId: number , qtde: number): Promise<Movimentacao |null>{
//     let pessoaBeneficiario: PessoaBeneficiario | null = await PessoaBeneficiario.findOneBy({id: pessoaBeneficiarioId,});
//     let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id: cdItemId});

//     if (!movimentacao) {
//       console.log("Movimentação não encontrada!");
//     }else if (!pessoaBeneficiario){
//       console.log("Beneficiário não encontrado");
//     }else if (!cdItem) {
//       console.log("Item não encontrado no CD");
//     }else if (qtde > cdItem.qtdade) {
//       console.log('Quantidade não disponivel no CD');
//     }
//     else {
//       cdItem.qtdade += movimentacao.qtde,
//       cdItem.qtdade -= qtde,
//       cdItem.save();
//       movimentacao.qtde = qtde,
//       movimentacao.tipo = tipo,
//       movimentacao.doador_nome = doadorNome,
//       movimentacao.pessoa_beneficiario_id = pessoaBeneficiarioId,
//       movimentacao.cd_item_id = cdItemId,
//       movimentacao.save();
//       return movimentacao;
//     }
//     return null;
//   };

//   async delete(movimentacao: Movimentacao, situacao: string): Promise<Movimentacao>{
//     movimentacao.situacao = situacao
//     await movimentacao.save()
//     return movimentacao
// }
// }
