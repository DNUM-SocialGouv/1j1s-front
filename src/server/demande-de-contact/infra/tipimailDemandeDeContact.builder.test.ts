import { aDemandeDeContactAccompagnement } from '~/server/demande-de-contact/domain/demandeDeContact.fixture';
import { buildDemandeDeContactApiTipimail } from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.builder';
import {
  aTipimailDemandeDeContactRequest,
  aTipimailDemandeDeContactWithRedirectionRequest,
} from '~/server/demande-de-contact/infra/tipimailDemandeDeContact.fixture';

describe('TipimailDemandeDeContactBuilder', () => {
  describe('buildDemandeDeContactApiTipimail', () => {
    describe('quand redirectTo est non définit', () => {
      it('construit l’email à envoyer', () => {
        const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();

        const result = buildDemandeDeContactApiTipimail(demandeDeContactAccompagnement);

        expect(result).toEqual(aTipimailDemandeDeContactRequest());
      });
    });

    describe('quand redirectTo est définit', () => {
      it('surcharge le destinataire avec cette variable', () => {
        const demandeDeContactAccompagnement = aDemandeDeContactAccompagnement();
        const redirectEmail = 'redirect@email.com';

        const result = buildDemandeDeContactApiTipimail(demandeDeContactAccompagnement, redirectEmail);

        expect(result).toEqual(aTipimailDemandeDeContactWithRedirectionRequest());
      });
    });
  });
});
