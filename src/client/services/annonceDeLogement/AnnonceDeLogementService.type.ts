import { AnnonceDeLogementAttributesFromCMS } from '~/client/components/features/Logement/AnnonceDeLogement.type';

export interface AnnonceDeLogementService {
	get(id: string): Promise<AnnonceDeLogementAttributesFromCMS>;
}
