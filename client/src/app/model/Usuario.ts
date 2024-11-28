import { AbstractModel } from "./AbstractModel";
import { Palavra } from "./Palavra";
import { Personagem } from "./Personagem";
import { Turma } from "./Turma";

export class Usuario extends AbstractModel {
    nome: string;
    username: string;
    password: string;
    dicaSenha: string;
    email: string;
    avatar: string;
    personagens: Personagem[];
    palavras: Palavra[];
    turmas: Turma[];
}