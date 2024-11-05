import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { GenericEntity } from "./GenericEntity";
import { Usuario } from "./Usuario";

@Entity()
export class Palavra extends GenericEntity {

    @Column({default: '', nullable: true})
    descricao: string;

    @Column({default: '', nullable: true, type: 'text'})
    imagem: string;

    @Column({default: false})
    pacotePadrao: string;

    @Column({default: 1, nullable: true})
    nivel: number;
    
    @ManyToOne(
        () => Usuario,
        usuario => usuario.palavras,
        { nullable: true, createForeignKeyConstraints: false }
    )
    usuario: Usuario;
}