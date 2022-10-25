import {
  aRésultatRechercheOffreEmploiAxiosResponse,
  aRésultatRéférentielCommuneResponse,
} from '@tests/fixtures/services/poleEmploiHttpClientService.fixture';
import { testApiHandler } from 'next-test-api-route-handler';
import nock from 'nock';

import { rechercherAlternanceHandler } from '~/pages/api/alternances';
import { RésultatsRechercheAlternance } from '~/server/alternances/domain/alternance';
import { ErrorHttpResponse } from '~/server/errors/errorHttpResponse';

describe('rechercher une alternance', () => {
  it('retourne la liste des alternances filtrée', async () => {
    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres')
      .get('/search?range=0-49&codeROME=D1103,D1101,H2101&commune=75101&natureContrat=E2,FS')
      .reply(200, aRésultatRechercheOffreEmploiAxiosResponse().data);

    nock('https://api.emploi-store.fr/partenaire/offresdemploi/v2/referentiel')
      .get('/communes')
      .reply(200, aRésultatRéférentielCommuneResponse().data);


    await testApiHandler<RésultatsRechercheAlternance | ErrorHttpResponse>({
      handler: (req, res) => rechercherAlternanceHandler(req, res),
      test: async ({ fetch }) => {
        const res = await fetch({ method: 'GET' });
        const json = await res.json();
        expect(json).toEqual({
          nombreRésultats: 3,
          résultats: [
            {
              adresse: undefined,
              contact: undefined,
              description: 'Nous recherchons pour la saison demi-mai à mi-octobre 2022 un(e) Barman h/f.\n\nVos missions principales: \n- Vous effectuez le service au comptoir, en salle, en terrasse, de boissons chaudes ou froides selon la législation relative à la consommation d\'alcools. \n- Vous entretenez la verrerie, les équipements du bar et les locaux selon les règles d\'hygiène et la réglementation  en vigueur.\n- Vous participez à la vie de la paillote. \n \nVous travaillez vendredi et samedi. \n\n\n',
              entreprise: undefined,
              from: 'peJob',
              id: '132LKFB',
              intitulé: 'Barman / Barmaid (H/F)',
              niveauRequis: undefined,
              typeDeContrats: ['Contrat apprentissage'],
              ville: 'BOURG LES VALENCE (26)',
              étiquetteList: ['BOURG LES VALENCE (26)', 'Débutant accepté', 'Saisonnier', 'Temps partiel'],
            },
            {
              adresse: undefined,
              contact: undefined,
              description: 'Vous recherchez un emploi ? Faites confiances à nos différences ! R.A.S Intérim, réseau d\'agences d\'emploi de 170 agences, propose des centaines d\'opportunités d\'emploi dans tous les secteurs d\'activité, en intérim, CDD et CDI.\n\nVotre Agence R.A.S Intérim de PORNIC, recherche un MACON dans pour un de ses clients spécialiste du BTP.\n\nVos missions:\n- Travaux de maçonnerie\n- Travaux sur différents matériaux (parpaings, brique...)\n- Lecture de plans\n\nVotre profil:\n- Titulaire d\'un CAP maçonnerie\n- Expérience sur un poste similaire\n- Rigueur/ Autonome\n\nDisponible? Envoyez nous votre CV !',
              entreprise: undefined,
              from: 'peJob',
              id: '130WPHC',
              intitulé: 'Maçon / Maçonne',
              niveauRequis: undefined,
              typeDeContrats: ['Contrat apprentissage'],
              ville: undefined,
              étiquetteList: ['Expérience exigée', 'Intérim', 'Temps partiel'],
            },
            {
              adresse: undefined,
              contact: undefined,
              description: 'Vous interviendrez sur le nettoyage des chambres de l\'Hôtel.\nVous changerez les draps et serviettes, nettoierez la salle de bain et les sanitaires, effectuerez la poussière et passerez l\'aspirateur.  \n\nNous vous proposons un contrat en vacation, vous devez pouvoir être disponible les weekend. 3 à 4 vacations par semaine.\nLa durée du contrat et le nombre d\'heure varieront en fonction des nécessites du service; c\'est à dire de 20 h à 24h de travail par semaine.\n\nPrise de poste au plus tôt.\n',
              entreprise: undefined,
              from: 'peJob',
              id: '132MDKM',
              intitulé: 'Valet / Femme de chambre',
              niveauRequis: undefined,
              typeDeContrats: ['Contrat apprentissage'],
              ville: 'BALARUC LES BAINS (34)',
              étiquetteList: ['BALARUC LES BAINS (34)', 'Expérience souhaitée', 'CDD', 'Temps partiel'],
            },
          ],
        });
      },
      url: '/alternances?codeCommune=75101&codeRomes=D1103,D1101,H2101&distanceCommune=30&longitudeCommune=2&latitudeCommune=48',
    });
  });
});
