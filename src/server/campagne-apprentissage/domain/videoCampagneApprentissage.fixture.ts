import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';

export function aVideoCampagneApprentissage(overrides?: Partial<VideoCampagneApprentissage>): VideoCampagneApprentissage {
	return {
		titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
		transcription: '[transcription]',
		videoId: 'V3cxW3ZRV-I',
		...overrides,
	};
}
