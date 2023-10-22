import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Categoria } from "./Categoria";
import { Cd_Item } from "./Cd_Item";

@Entity("itens")
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column({
    type: "char",
    default: "A",
  })
  public situacao: string;

  @Column()
  public categorias_idCategoria: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.item, { eager: true })
  @JoinColumn({ name: "categorias_idCategoria" })
  public categoria: Categoria;

  @OneToMany(() => Cd_Item, (cd_item) => cd_item.item)
  public cd_item: Promise<Cd_Item[]>;
}
