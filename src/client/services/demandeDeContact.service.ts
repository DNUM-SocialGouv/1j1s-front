import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { HttpClientService } from './httpClient.service';

export class DemandeDeContactService {

  constructor(private readonly httpClientService: HttpClientService ) {}

  async envoyerPourLeCEJ(body: any){
    try {
      await this.httpClientService.post('demandes-de-contact', { ...body, type: 'CEJ' });
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  };

  async envoyerPourLesEntreprisesSEngagent(body: any){
    try {
      await this.httpClientService.post('demandes-de-contact', { ...body, type: 'LesEntreprisesSEngagent' });
      return createSuccess(undefined);
    } catch (e) {
      return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
    }
  };
}
