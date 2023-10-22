import promptSync from "prompt-sync";
const prompt = promptSync();
import db from './db';
import server from './server';
import { UsuarioController } from "./controllers/UsuarioController";
import { CategoriaMenu } from "./views/CategoriaMenu";
import { CidadeMenu } from "./views/CidadeMenu";
import { ItemMenu } from "./views/ItemMenu";
import { PessoaBeneficiarioMenu } from "./views/PessoaBeneficiarioMenu";
import { CdMenu } from "./views/CdMenu";
import { Cd_ItemMenu } from "./views/Cd_ItemMenu";
import { MovimentacaoMenu } from "./views/MovimentacaoMenu";

// async function main():Promise<void>{
//   await db.initialize()
//   let usuarioMenu: UsuarioMenu = new UsuarioMenu();
//   let cidadeMenu: CidadeMenu = new CidadeMenu();
//   let categoriaMenu: CategoriaMenu = new CategoriaMenu();
//   let itemMenu: ItemMenu = new ItemMenu();
//   let pessoaBeneficiarioMenu: PessoaBeneficiarioMenu = new PessoaBeneficiarioMenu();
//   let cdMenu: CdMenu = new CdMenu();
//   let cd_itemMenu: Cd_ItemMenu = new Cd_ItemMenu();
//   let usuarioController: UsuarioController = new UsuarioController();
//   let movimentacaoMenu: MovimentacaoMenu = new MovimentacaoMenu();
//   let input;
//   do{
//     do{
//       console.clear()
//       console.log('0 - Sair');
//       console.log('1 - Login');
//       input = prompt('Selecione a opção desejada:');
//       if(input == '1'){
//         let login =  await usuarioController.login()
//         if(login){
//           do{
//             console.log('0 - Sair');
//             usuarioMenu.show();
//             cidadeMenu.show();
//             categoriaMenu.show();
//             pessoaBeneficiarioMenu.show();
//             itemMenu.show();
//             cdMenu.show();
//             cd_itemMenu.show();
//             movimentacaoMenu.show();
//             input = prompt('Selecione a opção desejada:');
//             if(input != '0'){
//               await usuarioMenu.execute(input);
//               await cidadeMenu.execute(input);
//               await categoriaMenu.execute(input);
//               await itemMenu.execute(input);
//               await pessoaBeneficiarioMenu.execute(input);
//               await cdMenu.execute(input);
//               await cd_itemMenu.execute(input);
//               await movimentacaoMenu.execute(input);

//               prompt('Pressione qualquer tecla para continuar:')
//             }
//           } while(input != '0')
//         } else{
//           console.log('Usuário ou senha incorretos!');
//           prompt('Pressione qualquer tecla para continuar:');
//         }
//       }
//     } while(input != '0')
//   }while(input!= '0')
// }

// main()


async function main():Promise<void>{

  await db.initialize()

  server.start()
}

main()
