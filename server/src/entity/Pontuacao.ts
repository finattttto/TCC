import { Entity, Column } from "typeorm";
import { GenericEntity } from "./GenericEntity";

@Entity()
export class Pontuacao extends GenericEntity {

    @Column({nullable: true})
    atividade: string;
    
    @Column({default: false})
    pacotePadrao: string;

    @Column({default: 0, nullable: true})
    total: number;
    
}