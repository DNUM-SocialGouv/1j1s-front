import {
	StrapiVideoCampagneApprentissage,
} from '~/server/campagne-apprentissage/infra/strapiVideoCampagneApprentissage';

export function aStrapiVideoCampagneApprentissage(overrides?: Partial<StrapiVideoCampagneApprentissage>): StrapiVideoCampagneApprentissage {
	return {
		Titre: 'Contrat d\'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…',
		Transcription: '[transcription]',
		Url: 'https://www.youtube.com/watch?v=V3cxW3ZRV-I',
		...overrides,
	};
}
