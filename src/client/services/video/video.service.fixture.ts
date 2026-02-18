import { VideoService } from './video.service';

export function aVideoService(override?: Partial<VideoService>): VideoService {
	return {
		allow: vi.fn(),
		isAllowed: vi.fn(() => true),
		...override,
	};
}
