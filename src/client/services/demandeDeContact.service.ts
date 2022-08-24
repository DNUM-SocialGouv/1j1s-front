import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { HttpClientService } from './httpClient.service';

export class DemandeDeContactService {
  constructor(private readonly httpClientService: HttpClientService ) {}
  async envoyer(body: any){
    try {
      await this.httpClientService.post('demande-de-contact', body);
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  };
}
