import { AnnonceDeLogementRepository } from '../domain/annonceDeLogement.repository';

export function anAnnonceDeLogementRepository(): AnnonceDeLogementRepository {
	return {
		getAnnonceDeLogementBySlug: vi.fn(),
		listAllAnnonceDeLogementSlug: vi.fn(),
	};
}
