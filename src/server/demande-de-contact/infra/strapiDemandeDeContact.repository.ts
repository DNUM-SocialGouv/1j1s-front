import axios from 'axios';

import {
  DemandeDeContactCEJ,
  DemandeDeContactEntreprise,
  DemandeDeContactPOE,
} from '~/server/demande-de-contact/domain/DemandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/DemandeDeContact.repository';
import { createFailure, createSuccess, Either } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { SentryException } from '~/server/exceptions/sentryException';
import { HttpClientServiceWithAuthentification } from '~/server/services/http/httpClientWithAuthentification.service';
import { LoggerService } from '~/server/services/logger.service';

export class StrapiDemandeDeContactRepository implements DemandeDeContactRepository {

  constructor(private httpClientServiceWithAuthentification: HttpClientServiceWithAuthentification) {
  }

  async saveCEJ(demandeDeContactCEJ: DemandeDeContactCEJ): Promise<Either<void>> {
    try {
      await this.httpClientServiceWithAuthentification.post('contact-cejs', {
        data: {
          age: demandeDeContactCEJ.age,
          code_postal: demandeDeContactCEJ.codePostal,
          email: demandeDeContactCEJ.email,
          nom: demandeDeContactCEJ.nom,
          prenom: demandeDeContactCEJ.prénom,
          telephone: demandeDeContactCEJ.téléphone,
          ville: demandeDeContactCEJ.ville,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        LoggerService.errorWithExtra(new SentryException(
          '[API Demande de contact] Erreur inconnue - Erreur insertion formulaire',
          { context: 'formulaire cej', source: 'API Demande de contact' },
          { errorDetail: e.response?.data },
        ));
      } else {
        LoggerService.errorWithExtra(new SentryException(
          '[API Demande de contact] Erreur inconnue - Erreur insertion formulaire',
          { context: 'formulaire cej', source: 'API Demande de contact' },
          { stacktrace: (<Error> e).stack },
        ));
      }

      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }

  async saveEntreprise(demandeDeContactEntreprise: DemandeDeContactEntreprise): Promise<Either<void>> {
    try {
      await this.httpClientServiceWithAuthentification.post('contact-entreprises', {
        data: {
          email: demandeDeContactEntreprise.email,
          message: demandeDeContactEntreprise.message,
          nom: demandeDeContactEntreprise.nom,
          prenom: demandeDeContactEntreprise.prénom,
          sujet: demandeDeContactEntreprise.sujet,
          telephone: demandeDeContactEntreprise.téléphone,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        LoggerService.errorWithExtra(new SentryException(
          '[API Demande de contact] Erreur inconnue - Erreur insertion formulaire',
          { context: 'formulaire entreprise', source: 'API Demande de contact' },
          { errorDetail: e.response?.data },
        ));
      } else {
        LoggerService.errorWithExtra(new SentryException(
          '[API Demande de contact] Erreur inconnue - Erreur insertion formulaire',
          { context: 'formulaire entreprise', source: 'API Demande de contact' },
          { stacktrace: (<Error> e).stack },
        ));
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }

  async savePOE(demandeDeContactPOE: DemandeDeContactPOE, annotation?: string): Promise<Either<void>> {
    try {
      await this.httpClientServiceWithAuthentification.post('contacts-poe', {
        data: {
          code_postal: demandeDeContactPOE.codePostal,
          commentaire: demandeDeContactPOE.commentaire,
          email: demandeDeContactPOE.email,
          nom: demandeDeContactPOE.nom,
          nom_societe: demandeDeContactPOE.nomSociété,
          nombreARecruter: demandeDeContactPOE.nombreARecruter,
          prenom: demandeDeContactPOE.prénom,
          secteur: demandeDeContactPOE.secteur,
          siret: demandeDeContactPOE.siret,
          taille: demandeDeContactPOE.taille,
          telephone: demandeDeContactPOE.téléphone,
          travail: demandeDeContactPOE.travail,
          ville: demandeDeContactPOE.ville,
          ...(annotation ? { erreur: annotation } : {}),
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        LoggerService.errorWithExtra(new SentryException(
          '[API Demande de contact] Erreur inconnue - Erreur insertion formulaire',
          { context: 'formulaire poe', source: 'API Demande de contact' },
          { errorDetail: e.response?.data },
        ));
      } else {
        LoggerService.errorWithExtra(new SentryException(
          '[API Demande de contact] Erreur inconnue - Erreur insertion formulaire',
          { context: 'formulaire poe', source: 'API Demande de contact' },
          { stacktrace: (<Error> e).stack },
        ));
      }
      return createFailure(ErreurMétier.SERVICE_INDISPONIBLE);
    }
    return createSuccess(undefined);
  }
}
