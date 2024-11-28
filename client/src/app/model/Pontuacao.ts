import { AbstractModel } from "./AbstractModel";
import { Personagem } from "./Personagem";


export class Pontuacao extends AbstractModel {
    atividade: string;
    total: number;
    personagem: Personagem;
}