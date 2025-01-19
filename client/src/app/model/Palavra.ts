import { AbstractModel } from "./AbstractModel";
import { Usuario } from "./Usuario";

export class Palavra extends AbstractModel {
    tipo: 'JOGO_ADIVINHACAO' | 'JOGO_PALAVRAS' = 'JOGO_ADIVINHACAO';
    descricao: string;
    imagem: string;
    pacotePadrao: string;
    dificuldade: 'FACIL' | 'MEDIO' | 'DIFICIL';
    usuario: Usuario;
    opcoes: string[] = [];
}