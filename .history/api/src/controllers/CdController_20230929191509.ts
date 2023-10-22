









// import { Cd } from "../models/Cd";
// import { Cidade } from "../models/Cidade";
// import promptSync from 'prompt-sync';
// const prompt = promptSync();

// export class CdController{

//   async create(nome: string, cidadeId: number, situacao: string): Promise<Cd | null> {

//     let cidade: Cidade | null = await Cidade.findOneBy({id: cidadeId});

//     if (!cidade) {
//       console.log("ID da cidade não encontrado!");
//     } else {
//       return await Cd.create({
//         nome: nome,
//         cidades_idCidade: cidadeId,
//         situacao: situacao
//       }).save();
//     }
//     return null;
//   }

//   async list (): Promise<Cd[]>{
//     return await Cd.find();
//   }

//   async find(id: number): Promise<Cd|null>{
//     return await Cd.findOneBy({id})
//   }

//   async edit(cd: Cd, nome: string, cidadeId: number): Promise<Cd|null>{
//     let cidade: Cidade | null = await Cidade.findOneBy({id: cidadeId});
//     if (!cidade) {
//       console.log("Cidade não encontrada!");
//     }else {
//       cd.nome = nome;
//       cd.cidades_idCidade = cidadeId;
//       cd.save();
//       return cd;
//     }
//     return null;
//   };

//   async delete(cd: Cd, situacao: string): Promise<Cd>{
//     cd.situacao = situacao
//     await cd.save()
//     return cd
// }
// }
