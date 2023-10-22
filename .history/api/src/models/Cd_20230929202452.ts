
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cidade } from "./Cidade";
import { Cd_Item } from "./Cd_Item";


@Entity('cds')
export class Cd extends BaseEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column({
    type: 'char'
  })
  public situacao: string;

  @Column()
  public cidades_idCidade: number;

  @ManyToOne(() => Cidade, (cidade) => cidade.cd)
  @JoinColumn({ name: 'cidades_idCidade' })
  public cidade: Cidade;

  @OneToMany(() => Cd_Item, (cd_item) => cd_item.cd)
  public cd_item: Promise<Cd_Item[]>;

}
