import { Image } from '~/server/cms/domain/image';

export function anImage(): Image {
	return {
		alt: 'text',
		src: 'https://animage.jpg',
	};
}
