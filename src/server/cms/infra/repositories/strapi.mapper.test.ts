import { mapVideoCampagneApprentissage } from '~/server/cms/infra/repositories/strapi.mapper';
import { Strapi } from '~/server/cms/infra/repositories/strapi.response';

describe('mapVideoCampagneApprentissage', () => {
	describe('quand l’url de la vidéo n’a pas de query params', () => {
		const url = 'https://www.youtube.com/watch?v=V3cxW3ZRV-I';

		it('map les données de la vidéo de campagne d’apprentissage', () => {
			const input: Strapi.CollectionType.VideoCampagneApprentissage = {
				Titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				Transcription: '[transcription]',
				Url: url,
			};

			const result = mapVideoCampagneApprentissage(input);

			expect(result).toEqual({
				titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				transcription: '[transcription]',
				videoId: 'V3cxW3ZRV-I',
			});
		});
	});

	describe('quand l’url de la vidéo a des query params', () => {
		const url = 'https://www.youtube.com/watch?v=F_oOtaxb0L8&t=1059';

		it('map les données de la vidéo de campagne d’apprentissage', () => {
			const input: Strapi.CollectionType.VideoCampagneApprentissage = {
				Titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				Transcription: '[transcription]',
				Url: url,
			};

			const result = mapVideoCampagneApprentissage(input);

			expect(result).toEqual({
				titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
				transcription: '[transcription]',
				videoId: 'F_oOtaxb0L8',
			});
		});
	});
});
