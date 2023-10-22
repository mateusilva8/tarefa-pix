import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { Cd } from "./Cd";
import { Movimentacao } from "./Movimentacao";


@Entity('cd_itens')
export class Cd_Item extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public qtdade: number;

  @Column({
    type: 'char'
  })
  public situacao: string;

  @Column()
  public itens_idItem: number

  @Column()
  public cds_idCd: number

  @ManyToOne(() => Item, (item) => item.cd_item)
  @JoinColumn({ name: 'itens_idItem' })
  public item: Item;

  @ManyToOne(() => Cd, (cd) => cd.cd_item)
  @JoinColumn({ name: 'cds_idCd' })
  public cd: Cd;

  @OneToMany(() => Movimentacao, (movimentacao) => movimentacao.cd_item)
  public movimentacao: Promise<Movimentacao[]>;
}


