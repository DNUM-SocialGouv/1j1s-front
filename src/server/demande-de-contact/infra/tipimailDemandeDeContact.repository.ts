import axios from 'axios';

import {
  buildDemandeDeContactApiTipimail,
} from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.builder';

import { createFailure, createSuccess, Either } from '../../errors/either';
import { ErreurMétier } from '../../errors/erreurMétier.types';
import { HttpClientService } from '../../services/http/httpClientService';
import { LoggerService } from '../../services/logger.service';
import { DemandeDeContactAccompagnement } from '../domain/DemandeDeContact';
import { DemandeDeContactMailRepository } from '../domain/DemandeDeContactMail.repository';

export class TipimailDemandeDeContactRepository implements DemandeDeContactMailRepository {
  constructor(private httpClient: HttpClientService) {}

  async envoyer(demandeDeContactAccompagnement: DemandeDeContactAccompagnement): Promise<Either<void>> {
    try {
      await this.httpClient.post('/messages/send', {
        age: demandeDeContactAccompagnement.age,
        code_postal: demandeDeContactAccompagnement.codePostal,
        commentaire: demandeDeContactAccompagnement.commentaire,
        email: demandeDeContactAccompagnement.email,
        nom: demandeDeContactAccompagnement.nom,
        prenom: demandeDeContactAccompagnement.prénom,
        telephone: demandeDeContactAccompagnement.téléphone,
        ville: demandeDeContactAccompagnement.ville,
      });
      return createSuccess(undefined);
    } catch (e) {
      LoggerService.error('[API Tipimail] Erreur lors de l’envoie de mail');
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }

  async send(envoieEmail: DemandeDeContactAccompagnement): Promise<Either<void>> {
    try {
      await this.httpClient.post('/messages/send', buildDemandeDeContactApiTipimail(envoieEmail));
      return createSuccess(undefined);
    } catch (e) {
      LoggerService.error('[API Tipimail] Erreur lors de l’envoie de mail');
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 404) {
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
  }
}
