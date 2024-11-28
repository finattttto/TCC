import { Entity, Column, ManyToOne } from "typeorm";
import { GenericEntity } from "./GenericEntity";
import { Usuario } from "./Usuario";

@Entity()
export class Personagem extends GenericEntity {

    @Column({nullable: true})
    nome: string;
    
    @Column({nullable: true})
    dataNascimento: Date;

    @Column({default: 1, nullable: true})
    nivel: number;

    @Column({nullable: true, type: 'text'})
	avatar: string;
    
    @ManyToOne(
        () => Usuario,
        usuario => usuario.personagens,
        { nullable: true, createForeignKeyConstraints: false }
    )
    usuario: Usuario;
}