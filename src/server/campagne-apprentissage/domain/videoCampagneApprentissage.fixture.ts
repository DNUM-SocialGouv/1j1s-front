import { VideoCampagneApprentissage } from '~/server/campagne-apprentissage/domain/videoCampagneApprentissage';

export function aVideoCampagneApprentissage(overrides?: Partial<VideoCampagneApprentissage>): VideoCampagneApprentissage {
	return {
		titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
		transcription: '[transcription]',
		videoId: 'V3cxW3ZRV-I',
		...overrides,
	};
}

export function aVideoCampagneApprentissageList(): Array<VideoCampagneApprentissage> {
	return [
		{
			titre: "Contrat d'engagement Jeune | Jade aimerait trouver un emploi stable qui lui plaise…",
			transcription: '[transcription]',
			videoId: 'V3cxW3ZRV-I',
		},
		{
			titre: "Qu'est-ce que le Contrat d'Engagement Jeune CEJ ?",
			transcription: '[transcription]',
			videoId: '7zD4PCOiUvw',
		},
	];
}

