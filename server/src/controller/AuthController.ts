import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Usuario } from "../entity/Usuario";
import configJwt from "../jwt/config-jwt";
import { decrypt } from "../cipher";
import { AppDataSource } from "../persistence/data-source";

class AuthController {
  public async login(request: Request, response: Response) {
    const { username, password } = request.body;
    const usuarioRepository = AppDataSource.getRepository(Usuario);
    const user = await usuarioRepository.findOneBy({
      username,
    });
    if (user) {
      console.log(user);

      const decrypted = decrypt(user?.password);
      if (decrypted == password) {
        const newToken = jwt.sign({ username }, configJwt.jwtSecret);
        return response.status(200).json({
          usuario: user,
          token: newToken,
        });
      }
    }

    return response.status(401).send("Usuário ou senha incorretos!");
  }
}

export default new AuthController();
