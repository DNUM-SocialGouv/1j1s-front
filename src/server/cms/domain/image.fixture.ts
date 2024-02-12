import { Image } from '~/server/cms/domain/image';

export function anImage(overrides?: Partial<Image>): Image {
	return {
		alt: 'text',
		src: 'https://animage.jpg',
		...overrides,
	};
}
