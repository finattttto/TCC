
import { AbstractModel } from "./AbstractModel";
import { Usuario } from "./Usuario";

export class Personagem extends AbstractModel {
    nome: string;
    dataNascimento: Date;
    nivel: number;
    avatar: string;
    usuario: Usuario;
}