import {
  anApprentiBoucherOffreFromMatcha,
  anApprentiBoucherOffreFromPoleEmploi,
} from '@tests/fixtures/domain/alternance.fixture';

import {
  constructUrlWidgetPourPostulerOffreMatcha,
  mapAlternanceToLienSolution,
} from '~/client/utils/alternance.utils';

describe('mapAlternanceToLienSolution', () => {
  describe('quand l alternance provient d une offre pole emploi', () => {
    it('retourne un lien solution pour pole emploi', () => {
      const result = mapAlternanceToLienSolution(anApprentiBoucherOffreFromPoleEmploi());

      expect(result).toEqual({
        descriptionOffre: 'Vos missions principales :\n \n- Réaliser les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires. \n- Effectuer la vente de produits de boucherie.',
        id: '134CMXJ',
        intituléOffre: 'APPRENTI (E) BOUCHER (ERE) (H/F)',
        lienOffre: '/apprentissage/peJob-134CMXJ',
        logoEntreprise: 'https://entreprise.pole-emploi.fr/static/img/logos/Oukw265FRpXdejCSFnIkDoqQujqGiEt4.png',
        nomEntreprise: 'AUCHAN SUPERMARCHE',
        étiquetteOffreList: [
          'AURILLAC (15)',
          'Alternance',
          'CDD',
        ],
      });
    });
  });

  describe('quand l alternance provient d une offre matcha', () => {
    it('retourne un lien solution pour matcha', () => {
      const result = mapAlternanceToLienSolution(anApprentiBoucherOffreFromMatcha());

      expect(result).toEqual({
        descriptionOffre: 'Réalise les opérations de préparation de viandes et de spécialités bouchères selon les règles d\'hygiène et de sécurité alimentaires.\\nPeut effectuer la vente de produits de boucherie.\\nPeut gérer un commerce de détail alimentaire (boucherie, boucherie-charcuterie, ...).',
        id: '628a64ed2ff4860027ae1501',
        intituléOffre: 'Boucherie',
        lienOffre: '/apprentissage/matcha-628a64ed2ff4860027ae1501',
        logoEntreprise: '/images/logos/la-bonne-alternance.svg',
        nomEntreprise: 'BOUCHERIE STEPHANE VEIT',
        étiquetteOffreList: [
          'Cap, autres formations niveau (Infrabac)',
          'Apprentissage',
          'Professionnalisation',
        ],
      });
    });
  });

  it('construit l url du widget LaBonneAlternance pour postuler une offre d alternance matcha', () => {
    const result = constructUrlWidgetPourPostulerOffreMatcha('628a65a72ff4860027ae1531');

    expect(result).toEqual('http://urlwidget.fr?caller=1jeune1solution&type=matcha&itemId=628a65a72ff4860027ae1531');
  });
});
