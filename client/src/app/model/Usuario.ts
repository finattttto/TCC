import { AbstractModel } from "./AbstractModel";

export class Usuario extends AbstractModel {
    username: string = "";
    password: string = "";
    name: string = "";
    email: string = "";
}