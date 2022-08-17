import { anArticle } from '@tests/fixtures/domain/article.fixture';
import { aMesuresJeunes } from '@tests/fixtures/domain/mesuresJeunes.fixture';
import { aStrapiHttpClientService } from '@tests/fixtures/services/strapiHttpClientService.fixture';

import { Article } from '~/server/cms/domain/article';
import { MentionsObligatoires } from '~/server/cms/domain/mentionsObligatoires';
import { MesuresJeunes } from '~/server/cms/domain/mesuresJeunes';
import { mapArticle, mapMentionObligatoire,mapMesuresJeunes } from '~/server/cms/infra/repositories/strapi.mapper';
import { StrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository';
import { createSuccess, Success } from '~/server/errors/either';
import { HttpClientService } from '~/server/services/http/httpClient.service';

describe('strapi cms repository', () => {
  let strapiHttpClientService: HttpClientService;
  let strapiCmsRepository: StrapiCmsRepository;

  describe('getArticleBySlug', () => {
    describe('Si un article est trouvé', () => {
      it('récupère l\'article selon le slug', async () => {
        strapiHttpClientService = aStrapiHttpClientService();
        strapiCmsRepository = new StrapiCmsRepository(strapiHttpClientService);

        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(createSuccess(anArticle()));
        const expectedArticle = anArticle();
        const slug = 'mon-article';

        const result = await strapiCmsRepository.getArticleBySlug(slug) as Success<Article>;

        expect(result.result).toEqual(expectedArticle);
        expect(strapiHttpClientService.get).toHaveBeenCalledWith(`articles?filters[slug][$eq]=${slug}&populate[0]=banniere`, mapArticle);
      });
    });
  });

  describe('getMentionObligatoire', () => {
    it('retourne le mention obligatoire a consulter', async () => {
      strapiHttpClientService = aStrapiHttpClientService();
      strapiCmsRepository = new StrapiCmsRepository(strapiHttpClientService);

      jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(createSuccess({
        contenu: 'La présente politique de confidentialité définit et vous informe de la manière dont le Ministère du Travail utilise les données à caractère personnel en conformité à le Règlement t européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 et la loi nᵒ 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés. \n\n[...]\n\n**Gestion des cookies**\n\n**<u>Cookie présent sur le Site</u>**\n| Type de cookie | Nom | Finalité | Durée de conservation |\n| - | - | - | - |\n| ... | Cookie chocolat blanc | Être mangé | Courte |\n| ... | Cookie myrtille | Être mangé, normal | Extrèmement courte |\n\n[...]\n\n<u>**Comment paramétrer les cookies ?**</u>\n\n[...]\n\nLors de votre utilisation du Site, il vous est possible de configurer vos préférences sur les cookies à tout moment en vous rendant sur l’onglet « Gestion des cookies » disponible en bas de la page d’accueil du Site. \n',
        titre: 'Politique de confidentialité',
      }));

      const result = await strapiCmsRepository.getMentionObligatoire(MentionsObligatoires.POLITIQUES_CONFIDENTIALITES) as Success<Article>;

      expect(result.result).toEqual({
        contenu: 'La présente politique de confidentialité définit et vous informe de la manière dont le Ministère du Travail utilise les données à caractère personnel en conformité à le Règlement t européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 et la loi nᵒ 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés. \n\n[...]\n\n**Gestion des cookies**\n\n**<u>Cookie présent sur le Site</u>**\n| Type de cookie | Nom | Finalité | Durée de conservation |\n| - | - | - | - |\n| ... | Cookie chocolat blanc | Être mangé | Courte |\n| ... | Cookie myrtille | Être mangé, normal | Extrèmement courte |\n\n[...]\n\n<u>**Comment paramétrer les cookies ?**</u>\n\n[...]\n\nLors de votre utilisation du Site, il vous est possible de configurer vos préférences sur les cookies à tout moment en vous rendant sur l’onglet « Gestion des cookies » disponible en bas de la page d’accueil du Site. \n',
        titre: 'Politique de confidentialité',
      });
      expect(strapiHttpClientService.get).toHaveBeenCalledWith('politique-de-confidentialite?populate=*', mapMentionObligatoire);
    });
  });

  describe('getCartesMesuresJeunes', () => {
    describe('Si les cartes mesures jeunes sont trouvés', () => {
      it('récupère les cartes jeunes', async () => {
        strapiHttpClientService = aStrapiHttpClientService();
        strapiCmsRepository = new StrapiCmsRepository(strapiHttpClientService);

        jest.spyOn(strapiHttpClientService, 'get').mockResolvedValue(createSuccess(aMesuresJeunes()));
        const expectedMesuesJeunes = aMesuresJeunes();
        const result = await strapiCmsRepository.getMesuresJeunes() as Success<MesuresJeunes>;

        expect(result.result).toEqual(expectedMesuesJeunes);
        expect(strapiHttpClientService.get).toHaveBeenCalledWith('mesure-jeune?populate[vieProfessionnelle][populate]=*&populate[orienterFormer][populate]=*&populate[accompagnement][populate]=*&populate[aidesFinancieres][populate]=*&', mapMesuresJeunes);
      });
    });
  });
});
