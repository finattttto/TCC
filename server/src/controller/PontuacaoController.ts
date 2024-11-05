
import {GenericController} from './GenericController';
import {Request, Response} from 'express';
import { IController } from './IController';
import { Pontuacao } from '../entity/Pontuacao';
import { AppDataSource } from '../persistence/data-source';

class PontuacaoController
    extends GenericController<Pontuacao>
    implements IController {
  public index(request: Request, response: Response) {
    return super.index(
        request,
        response,
        AppDataSource.getRepository(Pontuacao)
    );
  }
  
  public async save(request: Request, response: Response) {
    return super.save(
        request,
        response,
        AppDataSource.getRepository(Pontuacao)
    );
  }
  
  public show(request: Request, response: Response) {
    return super.show(
        request,
        response,
        AppDataSource.getRepository(Pontuacao)
    );
  }
  
  public update(request: Request, response: Response) {
    return super.update(
        request,
        response,
        AppDataSource.getRepository(Pontuacao)
    );
  }
  
  public remove(request: Request, response: Response) {
    return super.remove(
        request,
        response,
        AppDataSource.getRepository(Pontuacao)
    );
  }
  
}

export default new PontuacaoController();