import { hash } from "bcrypt";
import bcrypt from 'bcrypt';
import { Usuario } from "../models/Usuario";

import promptSync from 'prompt-sync';
import { PessoaBeneficiario } from "../models/PessoaBeneficiario";
import { Cidade } from "../models/Cidade";
const prompt = promptSync();


export class PessoaBeneficiarioController{

  async create(
    nome: string,
    cpf: string,
    dataNascimento: string,
    cidadesIdCidade: number,
    situacao: string,
  ): Promise<PessoaBeneficiario | null> {
    let cidade: Cidade | null = await Cidade.findOneBy({
      id: cidadesIdCidade,
    });

    if (!cidade) {
      console.log("ID da cidade não encontrado!");
    } else {
      return await PessoaBeneficiario.create({
        nome: nome,
        cpf: cpf,
        data_nascimento: dataNascimento,
        situacao: situacao,
        cidade: cidade
      }).save();
    }
    return null;
  }

  async list (): Promise<PessoaBeneficiario[]>{
    return await PessoaBeneficiario.find();
  }

  async find(id: number): Promise<PessoaBeneficiario|null>{
    return await PessoaBeneficiario.findOneBy({id})
  }

  async edit(
    pessoaBeneficiario: PessoaBeneficiario,
    nome: string,
    cpf: string,
    dataNascimento: string,
    situacao: string,
    cidadesIdCidade: number,
  ): Promise<PessoaBeneficiario | null> {
    let cidade: Cidade | null = await Cidade.findOneBy({
      id: cidadesIdCidade,
    });

    if (!pessoaBeneficiario) {
      console.log("Beneficiario não encontrado");
    } else if (!cidade) {
      console.log("Cidade não encontrada");
    } else {
      pessoaBeneficiario.nome = nome;
      pessoaBeneficiario.cpf = cpf;
      pessoaBeneficiario.data_nascimento = dataNascimento;
      pessoaBeneficiario.cidade = cidade;
      pessoaBeneficiario.situacao = situacao;
      pessoaBeneficiario.save();
      return pessoaBeneficiario;
    }
    return null;
  }

  async delete(pessoaBeneficiario: PessoaBeneficiario, situacao: string): Promise<PessoaBeneficiario>{
    pessoaBeneficiario.situacao = situacao
    await pessoaBeneficiario.save()
    return pessoaBeneficiario;
}
}
