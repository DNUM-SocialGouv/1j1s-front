import {
  aMétierRechercheList,
  anLaBonneAlternanceResponse, aResultOffreFromMatcha,
} from '@tests/fixtures/server/alternance/alternance.response.fixture';

import {
  mapContact,
  mapMétierRecherchéList,
  mapNomVille, mapOffreAlternance,
  mapRésultatsRechercheAlternance,
} from '~/server/alternances/infra/repositories/apiLaBonneAlternance.mapper';
import { mapDateDébutContrat } from '~/server/utils/mapDateDébutContrat.mapper.utils';

describe('mapper pour l api la bonne alternance', () => {
  describe('mapRésultatsRechercheAlternance', () => {
    describe('quand on reçoit des offres de pole emploi et matcha', () => {
      it('retourne une liste de résultats de pole emploi et matcha', () => {
        const result = mapRésultatsRechercheAlternance(anLaBonneAlternanceResponse());

        expect(result).toEqual({
          nombreRésultats: 2,
          résultats: [
            {
              adresse: '92 - ISSY LES MOULINEAUX 92130',
              description: 'Nous recherchons pour notre magasin de Issy-les-Moulineaux un(e) Apprenti(e) Boucher.\n\n\nVos missions : \n-\tAssurer les tâches de découpe, préparation et transformation des produits ; \n-\tVeiller à la présentation et rotation des produits ;\n-\tAccueillir, conseiller et servir les clients conformément à la charte HDA ;\n-\tVeiller à la propreté des linéaires, laboratoires, chambres froides, matériels et outils d\'aide à la vente ;\n-\tAssurer le bon déroulement de la chaîne du froid ;\n-\tAssurer et renseigner les documents de traçabilité ;\n-\tApplication des règles d\'hygiène.\n\n\n\nVotre profil :\n\n-\tDiplôme en Boucherie et expérience préparée ;\n-\tConnaissance des méthodes de découpe et de conservation ;\n-\tConnaissance des règles d\'hygiène et rigueur ;\n-\tQualités commerciales et sens du service client ;',
              entreprise: {
                logo: 'https://entreprise.pole-emploi.fr/static/img/logos/MYKCWy4RJwtb7tofHjEAub6WAAlRBvuM.png',
                nom: 'LES HALLES DE L\'AVEYRON',
              },
              from: 'peJob',
              id: '135GXSV',
              intitulé: 'Apprenti(e) Boucher / Bouchère  (H/F)',
              niveauRequis: 'Alternance',
              typeDeContrats: [
                'CDD',
              ],
              ville: 'ISSY LES MOULINEAUX (92)',
              étiquetteList: [
                'ISSY LES MOULINEAUX (92)',
                'Alternance',
                'CDD',
              ],
            },
            {
              adresse: '8 AV MONTAIGNE 31830 PLAISANCE-DU-TOUCH',
              entreprise: {
                logo: 'logo',
                nom: 'BOUCHERIE PLAISANCE',
              },
              from: 'matcha',
              id: '62c98502d2f6710027072c30',
              intitulé: 'Boucherie',
              niveauRequis: 'Cap, autres formations niveau (Infrabac)',
              typeDeContrats: [
                'Apprentissage',
                'Professionnalisation',
              ],
              étiquetteList: [
                'Cap, autres formations niveau (Infrabac)',
                'Apprentissage',
                'Professionnalisation',
              ],
            },
          ],
        });
      });

      // TODO : test manquant avec les valeurs undefined [ticket tech ici](https://github.com/DNUM-SocialGouv/1j1s-front/projects/1#card-84410110)
    });
  });

  describe('mapOffreAlternance', () => {
    describe('quand une offre provient de matcha', () => {
      it('retourne une offre d\'alternance matcha', () => {
        const result = mapOffreAlternance(aResultOffreFromMatcha());
        expect(result).toEqual({
          adresse: '8 AV MONTAIGNE 31830 PLAISANCE-DU-TOUCH',
          competencesDeBase: [
            "Définir le plan d'action commercial et établir le plan de tournée (ciblage, interlocuteurs, préparation de dossiers techniques)",
            'Concevoir une étude de faisabilité technique',
            'Établir un devis',
            'Négocier un contrat',
          ],
          contact: { nom: 'zahir oubouzar', téléphone: '0636145060' },
          description: 'Prospecte une clientèle de professionnels, propose des solutions techniques selon les besoins, impératifs du client et négocie les conditions commerciales de la vente.\\nPeut coordonner une équipe commerciale et animer un réseau de commerciaux.',
          duréeContrat: 1,
          débutContrat: '01/09/2022',
          entreprise: { logo: 'logo', nom: 'BOUCHERIE PLAISANCE' },
          from: 'matcha',
          id: '62c98502d2f6710027072c30',
          intitulé: 'Boucherie',
          niveauRequis: 'Cap, autres formations niveau (Infrabac)',
          rythmeAlternance: '2 semaines / 3 semaines',
          typeDeContrats: [ 'Apprentissage', 'Professionnalisation' ],
          étiquetteList: [
            'Cap, autres formations niveau (Infrabac)',
            'Apprentissage',
            'Professionnalisation',
          ],
        });
      });
    });
  });

  describe('mapNomVille', () => {
    describe('quand la ville est communiquée', () => {
      it('retourne le nom de la ville formatté', () => {
        const ville = '44 - Nantes';
        const villeFormattée = mapNomVille(ville);
        expect(villeFormattée).toEqual('Nantes (44)');
      });
    });

    describe('quand la ville n\'est pas communiquée', () => {
      it('retourne undefined', () => {
        const ville = undefined;
        const villeFormattée = mapNomVille(ville);
        expect(villeFormattée).toEqual(undefined);
      });
    });
  });

  describe('mapDateDébutContrat', () => {

    describe('quand la date de début de contrat est communiquée', () => {
      it('retourne la date formatté', () => {
        const dateDébutContrat = '2022-02-09T00:00:00.000Z';
        const dateFormattée = mapDateDébutContrat(dateDébutContrat);
        expect(dateFormattée).toEqual('09/02/2022');
      });
    });

    describe('quand la date de début de n\'est pas communiquée', () => {
      it('retourne undefined', () => {
        const dateDébutContrat = undefined;
        const dateFormattée = mapDateDébutContrat(dateDébutContrat);
        expect(dateFormattée).toEqual(undefined);
      });
    });
  });

  describe('mapContact', () => {
    describe('quand le contact n existe pas', () => {
      it('retourne undefined', () => {
        const result = mapContact(undefined);

        expect(result).toEqual(undefined);
      });
    });

    describe('quand le contact existe', () => {
      it('retourne le contact', () => {
        const result = mapContact({ name: 'Steph', phone: '06 11 22 33 44' });

        expect(result).toEqual({ nom: 'Steph', téléphone: '06 11 22 33 44' });
      });
    });
  });

  describe('mapMétierRecherchéList', () => {
    it('retourne la liste des codes romes et son libellié assossié', () => {
      const result = mapMétierRecherchéList(aMétierRechercheList());

      expect(result).toEqual([
        {
          codeROMEList: ['F1106'],
          intitulé: 'Electricité, climatisation, domotique, électronique',
        },
        {
          codeROMEList: ['H1209'],
          intitulé: 'Génie électrique',
        },
      ]);
    });
  });
});
