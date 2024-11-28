
import { AbstractModel } from "./AbstractModel";
import { Usuario } from "./Usuario";

export class Personagem extends AbstractModel {

    atividade: string;
    pacotePadrao: string;
    total: number;
    usuario: Usuario;
    avatar: string;
}