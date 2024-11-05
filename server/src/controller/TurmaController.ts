
import {GenericController} from './GenericController';
import {Request, Response} from 'express';
import { IController } from './IController';
import { Turma } from '../entity/Turma';
import { AppDataSource } from '../persistence/data-source';

class TurmaController
    extends GenericController<Turma>
    implements IController {
  public index(request: Request, response: Response) {
    return super.index(
        request,
        response,
        AppDataSource.getRepository(Turma)
    );
  }
  
  public async save(request: Request, response: Response) {
    return super.save(
        request,
        response,
        AppDataSource.getRepository(Turma)
    );
  }
  
  public show(request: Request, response: Response) {
    return super.show(
        request,
        response,
        AppDataSource.getRepository(Turma)
    );
  }
  
  public update(request: Request, response: Response) {
    return super.update(
        request,
        response,
        AppDataSource.getRepository(Turma)
    );
  }
  
  public remove(request: Request, response: Response) {
    return super.remove(
        request,
        response,
        AppDataSource.getRepository(Turma)
    );
  }
  
}

export default new TurmaController();