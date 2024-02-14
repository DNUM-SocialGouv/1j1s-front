import {
	SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM,
} from '~/server/entreprises/domain/EntrepriseSouhaitantSEngager';
import { ApiLesEntreprisesSEngagentCompany } from '~/server/entreprises/infra/apiLesEntreprisesSEngagentCompany';

export function anApiLesEntreprisesSEngagentCompany(overrides?: Partial<ApiLesEntreprisesSEngagentCompany>): ApiLesEntreprisesSEngagentCompany {
	return {
		companyName: 'Bidule co.',
		companyPostalCode: '75015',
		companySector: SECTEUR_ACTIVITE_REJOINDRE_MOBILISATION_VALEUR_ENUM.OTHER_SERVICES,
		companySiret: '12345678901114',
		companySize: 'medium',
		email: 'machin.chose@bidule.com',
		firstname: 'Machin',
		from1j1s: true,
		hasAgreedToCGU: false,
		job: 'Chef',
		lastname: 'Chose',
		phone: '+33123456789',
		whereDidYouKnowUs: 'service-public',
		...overrides,
	};
}
