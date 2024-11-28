import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { GenericEntity } from "./GenericEntity";
import { Personagem } from "./Personagem";

@Entity()
export class Pontuacao extends GenericEntity {

    @Column({nullable: true})
    atividade: string;

    @Column({default: 0, nullable: true})
    total: number;

    @ManyToOne(() => Personagem, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: "FK_PontuacaoPersonagem" })
    personagem: Personagem;
    
}