import axios from 'axios';

import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

import { OldHttpClientService } from '../../services/http/oldHttpClientService';
import { Entreprise } from '../domain/Entreprise';
import { RejoindreLaMobilisationRepository } from '../domain/RejoindreLaMobilisation.repository';

export class ApiRejoindreLaMobilisationRepository implements RejoindreLaMobilisationRepository {
  constructor(private client: OldHttpClientService) {}

  async save (entreprise: Entreprise): Promise<Either<void>> {
    try {
      await this.client.post('/api/members', this.mapEntreprise(entreprise));
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 400) {
          return createFailure(ErreurMétier.DEMANDE_INCORRECTE);
        }
        if (e.response?.status === 409) {
          return createFailure(ErreurMétier.CONFLIT_D_IDENTIFIANT);
        }
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }

  private mapEntreprise(e: Entreprise) {
    return {
      companyName: e.nomSociété,
      companyPostalCode: e.codePostal,
      companySector: e.secteur,
      companySiret: e.siret,
      companySize: e.taille,
      email: e.email,
      firstname: e.prénom,
      from1j1s: true,
      job: e.travail,
      lastname: e.nom,
      phone: e.téléphone,
    };
  }
}
