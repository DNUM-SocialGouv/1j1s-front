import { FormationInitialeDetailRepository } from '../domain/formationInitialeDetail.repository';

export function aStrapiFormationInitialeDetailRepository() : FormationInitialeDetailRepository {
	return {
		getFormationInitialeById: jest.fn(),
	};
}
