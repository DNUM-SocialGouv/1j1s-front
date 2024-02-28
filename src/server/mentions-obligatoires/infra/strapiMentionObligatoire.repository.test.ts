import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { createSuccess } from '~/server/errors/either';

import { aMentionObligatoire } from '../domain/mentionObligatoire.fixture';
import { TypeDeMentionObligatoire } from '../domain/typeDeMentionObligatoire';
import { aStrapiMentionObligatoire } from './strapiMentionObligatoire.fixture';
import { StrapiMentionObligatoireRepository } from './strapiMentionObligatoire.repository';

describe('StrapiMentionObligatoireRepository', () => {
	it('appelle le service CMS avec les bon paramètres', () => {
		// GIVEN
		const cmsService = aStrapiCmsRepository();
		const cmsServiceResponse = aStrapiMentionObligatoire({
			contenu: 'La présente politique de confidentialité définit et vous informe de la manière dont le Ministère du Travail utilise les données à caractère personnel en conformité à le Règlement t européen (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 et la loi nᵒ 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés. \n\n[...]\n\n**Gestion des cookies**\n\n**<u>Cookie présent sur le Site</u>**\n| Type de cookie | Nom | Finalité | Durée de conservation |\n| - | - | - | - |\n| ... | Cookie chocolat blanc | Être mangé | Courte |\n| ... | Cookie myrtille | Être mangé, normal | Extrèmement courte |\n\n[...]\n\n<u>**Comment paramétrer les cookies ?**</u>\n\n[...]\n\nLors de votre utilisation du Site, il vous est possible de configurer vos préférences sur les cookies à tout moment en vous rendant sur l’onglet « Gestion des cookies » disponible en bas de la page d’accueil du Site. \n',
			titre: 'Politique de confidentialité',
		});
		jest.spyOn(cmsService, 'getSingleType').mockResolvedValueOnce(createSuccess(cmsServiceResponse));
		const mentionObligatoireRepository = new StrapiMentionObligatoireRepository(cmsService);

		// WHEN
		mentionObligatoireRepository.getMentionObligatoire(TypeDeMentionObligatoire.POLITIQUES_CONFIDENTIALITES);

		// THEN
		expect(cmsService.getSingleType).toHaveBeenCalledWith(TypeDeMentionObligatoire.POLITIQUES_CONFIDENTIALITES, 'populate=deep');
	});

	it('retourne la mention obligatoire', async () => {
		// GIVEN
		const cmsService = aStrapiCmsRepository();
		jest.spyOn(cmsService, 'getSingleType').mockResolvedValueOnce(createSuccess(aStrapiMentionObligatoire({
			contenu: 'Ceci est une politique de confidentialité',
			titre: 'Politique de confidentialité',
		})));
		const mentionObligatoireRepository = new StrapiMentionObligatoireRepository(cmsService);

		// WHEN
		const result = await mentionObligatoireRepository.getMentionObligatoire(TypeDeMentionObligatoire.POLITIQUES_CONFIDENTIALITES);

		// THEN
		expect(result).toStrictEqual(createSuccess(aMentionObligatoire({
			contenu: 'Ceci est une politique de confidentialité',
			titre: 'Politique de confidentialité',
		})));
	});
});
