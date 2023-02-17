import { Image } from '~/server/cms/domain/image';

export function anImage(): Image {
	return {
		alt: 'text',
		url: 'https://animage.jpg',
	};
}
