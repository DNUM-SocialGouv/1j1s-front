import { VideoService } from './video.service';

export function aVideoService(override?: Partial<VideoService>): VideoService {
	return {
		isAllowed: jest.fn(() => true),
		...override,
	};
}
