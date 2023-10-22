import { Cd_Item } from "../models/Cd_Item";
import promptSync from 'prompt-sync';
import { PessoaBeneficiario } from "../models/PessoaBeneficiario";
import { Movimentacao } from "../models/Movimentacao";
const prompt = promptSync();


export class MovimentacaoController{

  async create(tipo: string, doadorNome: string, pessoaBeneficiarioId: number, cdItemId: number , qtde: number): Promise<Movimentacao | null> {

    let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id: cdItemId,});
    let pessoaBeneficiario: PessoaBeneficiario | null = await PessoaBeneficiario.findOneBy({id: pessoaBeneficiarioId,});

    if (!cdItem) {
      console.log("ID do item não encontrado!");
    } else if(!pessoaBeneficiario){
      console.log("ID do beneficiário não encontrado!");
    } else{
      if (tipo == 'S') {
        if(cdItem.qtdade < qtde){
          console.log('Quantidade não disponivel no CD')
        } else {
          cdItem.qtdade -= qtde;
          await cdItem.save();
          return await Movimentacao.create({
            tipo: tipo,
            doador_nome: doadorNome,
            pessoa_beneficiario_id: pessoaBeneficiarioId,
            cd_item_id: cdItemId,
            qtde: qtde,
            situacao: 'A'
          }).save()
        }
      } else if(tipo == 'E'){
        cdItem.qtdade += qtde;
        await cdItem.save();
        return await Movimentacao.create({
          tipo: tipo,
          doador_nome: doadorNome,
          pessoa_beneficiario_id: pessoaBeneficiarioId,
          cd_item_id: cdItemId,
          qtde: qtde,
          situacao: 'A'
        }).save()
      }
    }
    return null;
  }

  async list (): Promise<Movimentacao[]>{
    return await Movimentacao.find();
  }

  async find(id: number): Promise<Movimentacao|null>{
    return await Movimentacao.findOneBy({id})
  }

  async edit(movimentacao: Movimentacao | null , tipo: string, doadorNome: string, pessoaBeneficiarioId: number, cdItemId: number , qtde: number): Promise<Movimentacao |null>{
    let pessoaBeneficiario: PessoaBeneficiario | null = await PessoaBeneficiario.findOneBy({id: pessoaBeneficiarioId,});
    let cdItem: Cd_Item | null = await Cd_Item.findOneBy({id: cdItemId});

    if (!movimentacao) {
      console.log("Movimentação não encontrada!");
    }else if (!pessoaBeneficiario){
      console.log("Beneficiário não encontrado");
    }else if (!cdItem) {
      console.log("Item não encontrado no CD");
    }else if (qtde > cdItem.qtdade) {
      console.log('Quantidade não disponivel no CD');
    }
    else {
      cdItem.qtdade += movimentacao.qtde,
      cdItem.qtdade -= qtde,
      cdItem.save();
      movimentacao.qtde = qtde,
      movimentacao.tipo = tipo,
      movimentacao.doador_nome = doadorNome,
      movimentacao.pessoa_beneficiario_id = pessoaBeneficiarioId,
      movimentacao.cd_item_id = cdItemId,
      movimentacao.save();
      return movimentacao;
    }
    return null;
  };

  async delete(movimentacao: Movimentacao, situacao: string): Promise<Movimentacao>{
    movimentacao.situacao = situacao
    await movimentacao.save()
    return movimentacao
}
}