import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cidade } from "./Cidade";
import { Movimentacao } from "./Movimentacao";

@Entity("pessoas_beneficiarios")
export class PessoaBeneficiario extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome: string;

  @Column()
  public cpf: string;

  @Column()
  public data_nascimento: string;

  @Column()
  public cidades_id_cidade: number;

  @Column({
    type: "char",
  })
  public situacao: string;

  @ManyToOne(() => Cidade, (cidade) => cidade.pessoaBeneficiario, {
    eager: true,
  })
  @JoinColumn({ name: "cidades_id_cidade" })
  public cidade: Cidade;

  @OneToMany(
    () => Movimentacao,
    (movimentacao) => movimentacao.pessoa_beneficiario
  )
  public movimentacao: Promise<Movimentacao[]>;
}
