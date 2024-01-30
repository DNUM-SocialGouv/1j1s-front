import { VideoCampagneApprentissage } from '../domain/videoCampagneApprentissage';
import { StrapiVideoCampagneApprentissage } from './strapiVideoCampagneApprentissage';

export function mapToVideoCampagneApprentissage(strapiVideoCampagneApprentissage: StrapiVideoCampagneApprentissage): VideoCampagneApprentissage {
	const videoIdWithPotentialParams = strapiVideoCampagneApprentissage.Url.split('v=')[1];
	const videoId = videoIdWithPotentialParams.split('&')[0];
	return {
		titre: strapiVideoCampagneApprentissage.Titre,
		transcription: strapiVideoCampagneApprentissage.Transcription,
		videoId: videoId,
	};
}
