import { aVideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage.fixture';
import {
	mapToVideoCampagneApprentissage,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage.mapper';

import {
	aStrapiVideoCampagneApprentissage,
} from './strapiVideoCampagneApprentissage.fixture';

describe('mapToVideoCampagneApprentissage', () => {
	it('map le contenu d’une vidéo strapi vers une vidéo campagne apprentissage', () => {
		// GIVEN
		const strapiVideo = aStrapiVideoCampagneApprentissage({
			Titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
			Transcription: '[transcription]',
			Url: 'https://www.youtube.com/watch?v=V3cxW3ZRV-I&additionnalParams=true',
		});

		// WHEN
		const videoCampagneApprentissage = mapToVideoCampagneApprentissage(strapiVideo);

		// THEN
		expect(videoCampagneApprentissage).toStrictEqual(aVideoCampagneApprentissage(
			{
				titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
				transcription: '[transcription]',
				videoId: 'V3cxW3ZRV-I',
			}),
		);
	});
});
