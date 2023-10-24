import { aFormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.fixture';
import { FormationInitialeDetailCMS } from '~/server/formations-initiales-detail/domain/formationInitiale.type';
import { mapFormationInitiale } from '~/server/formations-initiales-detail/infra/mapper/formationInitialeDetail.mapper';
import {
	aStrapiFormationInitialeDetail,
} from '~/server/formations-initiales-detail/infra/strapiFormationIntialeDetail.fixture';

describe('formation initiale détail mapper', () => {
	it('map vers le détail d‘une formation initiale', () => {
		const formationInitialeStrapiReponse = aStrapiFormationInitialeDetail({
			attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
			certification: 'Bac + 5',
			conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
			description: 'Je suis une description de formation initiale',
			duree: '1 an',
			identifiant: 'FOR.495',
			intitule: 'BM boulanger',
			niveauEtudesVise: '5',
			poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
			updatedAt: '2023-05-15T09:37:44.283Z',
		});
		const formationExpected: FormationInitialeDetailCMS = aFormationInitialeDetailCMS({
			attendusParcoursup: 'L‘option managament d‘unité de production culinaire vise à maîtriser des techniques culinaires propres aux différents types de restauration',
			conditionsAcces: 'Le diplomé peut débuter comme chef de partie, second de cuisine, avant d‘accéder à des postes d‘encadrement ou de direction.',
			description: 'Je suis une description de formation initiale',
			poursuiteEtudes: 'Le BTS est un diplôme conçu pour une insertion professionnelle',
		});

		const formationInitialeMapped = mapFormationInitiale(formationInitialeStrapiReponse);

		expect(formationInitialeMapped).toStrictEqual(formationExpected);
	});
});
