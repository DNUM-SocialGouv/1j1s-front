import { Strapi } from '~/server/services/cms/infra/repositories/responses/cmsResponse';

export function strapiImageFixture(override?: Strapi.ImageAttributes): Strapi.Image {
	return {
	  data: {
			attributes: {
			  alternativeText: 'text',
			  caption: 'string',
			  createdAt: 'string',
			  ext: 'string',
			  formats: strapiImageFormatListFixture(),
			  hash: 'string',
			  height: 100,
			  mime: 'string',
			  name: 'string',
			  previewUrl: 'string',
			  provider: 'string',
			  provider_metadata: 'string',
			  size: 100,
			  updatedAt: 'string',
			  url: 'https://animage.jpg',
			  width: 100,
				...override,
			},
	  },
	};
}

function strapiImageFormatListFixture(): Strapi.ImageFormatList {
	return {
		large: {
			ext: 'string',
			hash: 'string',
			height: 100,
			mime: 'string',
			name: 'string',
			path: 'string',
			size: 100,
			url: 'string',
			width: 100,
		},
	};
}
