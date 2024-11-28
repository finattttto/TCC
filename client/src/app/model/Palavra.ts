import { AbstractModel } from "./AbstractModel";
import { Usuario } from "./Usuario";

export class Palavra extends AbstractModel {
    descricao: string;
    imagem: string;
    pacotePadrao: string;
    dificuldade: 'FACIL' | 'MEDIO' | 'DIFICIL';
    usuario: Usuario;
}