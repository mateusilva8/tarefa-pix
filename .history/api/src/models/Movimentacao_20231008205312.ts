import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cd_Item } from "./Cd_Item";
import { PessoaBeneficiario } from "./PessoaBeneficiario";

@Entity("movimentacoes")
export class Movimentacao extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "timestamp", default: "NOW()" })
  public data_hora: string;

  @Column({
    type: "char",
  })
  public tipo: string;

  @Column()
  public doador_nome: string;

  @Column({
    type: "int",
  })
  public qtde: number;

  @Column({
    type: "char",
  })
  public situacao: string;

  @Column({
    type: "int",
  })
  public cd_item_id: number;

  @ManyToOne(() => Cd_Item, (cdItem) => cdItem.movimentacao, { eager: true })
  @JoinColumn({ name: "cd_item_id" })
  public cd_item: Cd_Item;

  @Column({
    type: "int",
  })
  public pessoa_beneficiario_id: number;

  @ManyToOne(
    () => PessoaBeneficiario,
    (pessoaBeneficiario) => pessoaBeneficiario.movimentacao
  )
  @JoinColumn({ name: "pessoa_beneficiario_id" })
  public pessoa_beneficiario: PessoaBeneficiario;
}
