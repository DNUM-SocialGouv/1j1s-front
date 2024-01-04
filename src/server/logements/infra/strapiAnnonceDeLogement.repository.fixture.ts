import { AnnonceDeLogementRepository } from '../domain/annonceDeLogement.repository';

export function anAnnonceDeLogementRepository(): AnnonceDeLogementRepository {
	return {
		getAnnonceDeLogementBySlug: jest.fn(),
		listAllAnnonceDeLogementSlug: jest.fn(),
	};
}
