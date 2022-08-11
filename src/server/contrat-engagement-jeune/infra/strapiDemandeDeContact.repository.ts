import { createSuccess, Either } from '~/server/errors/either';
import { StrapiHttpClientService } from '~/server/services/http/strapiHttpClient.service';

import { DemandeDeContact } from '../domain/DemandeDeContact';
import { DemandeDeContactRepository } from '../domain/DemandeDeContact.repository';

export class StrapiDemandeDeContactRepository implements DemandeDeContactRepository {
   
  constructor(private strapiHttpClientService: StrapiHttpClientService) {
  }
  async save(demandeDeContact: DemandeDeContact): Promise<Either<void>> {
    await this.strapiHttpClientService.post('contacts', {
      data: {
        age: demandeDeContact.age,
        email: demandeDeContact.email,
        nom: demandeDeContact.nom,
        prenom: demandeDeContact.prénom,
        telephone: demandeDeContact.téléphone,
        ville: demandeDeContact.ville,
      },
    });
    return createSuccess(undefined);
  }
    
}
