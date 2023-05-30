import { VideoService } from './video.service';

export function aVideoService(override?: Partial<VideoService>): VideoService {
	return {
		allow: jest.fn(),
		isAllowed: jest.fn(() => true),
		...override,
	};
}
