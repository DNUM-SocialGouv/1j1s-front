import { anArticle } from '@tests/fixtures/domain/article.fixture';
import { aFicheMetier } from '@tests/fixtures/domain/ficheMetier.fixture';
import { aMesuresJeunes } from '@tests/fixtures/domain/mesuresJeunes.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { Article } from '~/server/cms/domain/article';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import {
  mapArticle,
  mapFicheMetier,
  mapMentionObligatoire,
  mapMesuresJeunes,
} from '~/server/cms/infra/repositories/strapi.mapper';
import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { createFailure, createSuccess, Failure, Success } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { HttpClientService } from '~/server/services/http/httpClient.service';

describe('strapi cms repository', () => {
  let httpClientService: HttpClientService;
  let strapiCmsRepository: StrapiCmsRepository;

  describe('getArticleBySlug', () => {
    describe('Si un article est trouvé', () => {
      it('récupère l\'article selon le slug', async () => {
        httpClientService = aStrapiHttpClientService();
        strapiCmsRepository = new StrapiCmsRepository(httpClientService);

        jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(anArticle()));
        const expectedArticle = anArticle();
        const slug = 'mon-article';

        const result = await strapiCmsRepository.getArticleBySlug(slug) as Success<Article>;

        expect(result.result).toEqual(expectedArticle);
        expect(httpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}&populate[0]=banniere`, mapArticle);
      });
    });
  });

  describe('getFicheMetierByNom', () => {
    const nomMetier = 'Mon%20super%20metier';
    const expectedFicheMetier = aFicheMetier();

    beforeEach(() => {
      httpClientService = aStrapiHttpClientService();
      strapiCmsRepository = new StrapiCmsRepository(httpClientService);
    });
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('appelle l\'endpoint avec les bons paramètres', async () => {
      jest.spyOn(httpClientService, 'get');

      await strapiCmsRepository.getFicheMetierByNom(nomMetier);

      expect(httpClientService.get).toHaveBeenCalledWith(`fiche-metiers?filters[nom_metier][$eq]=${nomMetier}`, mapFicheMetier);
    });
    describe('Si une fiche métier est trouvée', () => {
      it('récupère la fiche métier selon le nom', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(expectedFicheMetier));

        const result = await strapiCmsRepository.getFicheMetierByNom(nomMetier) as Success<FicheMétier>;

        expect(result.result).toEqual(expectedFicheMetier);
      });
    });
    describe('Si aucune fiche métier n\'est trouvée', () => {
      it('retourne une erreur', async () => {
        jest.spyOn(httpClientService, 'get').mockResolvedValue(createFailure(ErreurMétier.CONTENU_INDISPONIBLE));

        const result = await strapiCmsRepository.getFicheMetierByNom(nomMetier) as Failure;

        expect(result.errorType).toEqual(ErreurMétier.CONTENU_INDISPONIBLE);
      });
    });
  });

  describe('getMentionObligatoire', () => {
    it('retourne le mention obligatoire a consulter', async () => {
      httpClientService = aStrapiHttpClientService();
      strapiCmsRepository = new StrapiCmsRepository(httpClientService);

      jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess({
        contenu: 'La présente politique de confidentialité définit et vous informe de la manière dont le Ministère du Travail utilise les données à caractère personnel en conformité à le Règlement t européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 et la loi nᵒ 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés. \n\n[...]\n\n**Gestion des cookies**\n\n**<u>Cookie présent sur le Site</u>**\n| Type de cookie | Nom | Finalité | Durée de conservation |\n| - | - | - | - |\n| ... | Cookie chocolat blanc | Être mangé | Courte |\n| ... | Cookie myrtille | Être mangé, normal | Extrèmement courte |\n\n[...]\n\n<u>**Comment paramétrer les cookies ?**</u>\n\n[...]\n\nLors de votre utilisation du Site, il vous est possible de configurer vos préférences sur les cookies à tout moment en vous rendant sur l’onglet « Gestion des cookies » disponible en bas de la page d’accueil du Site. \n',
        titre: 'Politique de confidentialité',
      }));

      const result = await strapiCmsRepository.getMentionObligatoire(MentionsObligatoires.POLITIQUES_CONFIDENTIALITES) as Success<Article>;

      expect(result.result).toEqual({
        contenu: 'La présente politique de confidentialité définit et vous informe de la manière dont le Ministère du Travail utilise les données à caractère personnel en conformité à le Règlement t européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 et la loi nᵒ 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés. \n\n[...]\n\n**Gestion des cookies**\n\n**<u>Cookie présent sur le Site</u>**\n| Type de cookie | Nom | Finalité | Durée de conservation |\n| - | - | - | - |\n| ... | Cookie chocolat blanc | Être mangé | Courte |\n| ... | Cookie myrtille | Être mangé, normal | Extrèmement courte |\n\n[...]\n\n<u>**Comment paramétrer les cookies ?**</u>\n\n[...]\n\nLors de votre utilisation du Site, il vous est possible de configurer vos préférences sur les cookies à tout moment en vous rendant sur l’onglet « Gestion des cookies » disponible en bas de la page d’accueil du Site. \n',
        titre: 'Politique de confidentialité',
      });
      expect(httpClientService.get).toHaveBeenCalledWith('politique-de-confidentialite?populate=*', mapMentionObligatoire);
    });
  });

  describe('getCartesMesuresJeunes', () => {
    describe('Si les cartes mesures jeunes sont trouvés', () => {
      it('récupère les cartes jeunes', async () => {
        httpClientService = aStrapiHttpClientService();
        strapiCmsRepository = new StrapiCmsRepository(httpClientService);

        jest.spyOn(httpClientService, 'get').mockResolvedValue(createSuccess(aMesuresJeunes()));
        const expectedMesuesJeunes = aMesuresJeunes();
        const result = await strapiCmsRepository.getMesuresJeunes() as Success<MesuresJeunes>;

        expect(result.result).toEqual(expectedMesuesJeunes);
        expect(httpClientService.get).toHaveBeenCalledWith('mesure-jeune?populate[vieProfessionnelle][populate]=*&populate[orienterFormer][populate]=*&populate[accompagnement][populate]=*&populate[aidesFinancieres][populate]=*&', mapMesuresJeunes);
      });
    });
  });
});
