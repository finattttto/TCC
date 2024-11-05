import { Entity, Column, ManyToOne } from "typeorm";
import { GenericEntity } from "./GenericEntity";
import { Usuario } from "./Usuario";

@Entity()
export class Personagem extends GenericEntity {

    @Column({nullable: true})
    atividade: string;
    
    @Column({default: false})
    pacotePadrao: string;

    @Column({default: 0, nullable: true})
    total: number;
    
    @ManyToOne(
        () => Usuario,
        usuario => usuario.personagens,
        { nullable: true, createForeignKeyConstraints: false }
    )
    usuario: Usuario;
}