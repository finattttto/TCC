import { AbstractModel } from "./AbstractModel";
import { Usuario } from "./Usuario";

export class Turma extends AbstractModel {
    nome: string;
    codigo: string;
    palavras: number[];
    usuario: Usuario;
}