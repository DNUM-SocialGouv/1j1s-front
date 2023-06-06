import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../../Icon/Icon';
import { ArticleCard } from './ArticleCard';

const meta: Meta<typeof ArticleCard> = {
	argTypes: {
		icon: {
			mapping: {
				'angle-left': <Icon name="angle-left" />,
				'angle-right': <Icon name="angle-right" />,
				'magnifying-glass': <Icon name="magnifying-glass" />,
			},
			options: ['magnifying-glass', 'angle-left', 'angle-right'],
		},
	},
	args: {
		children: 'Découvrez un argument supplémentaire à avancer pour vous faire embaucher',
		imageFit: 'cover',
		imageSrc: 'https://i0.wp.com/caravanedesdixmots.com/wp-content/uploads/2021/05/placeholder.png',
		link: 'https://www.1jeune1solution.gouv.fr/articles/l-aide-a-l-apprentissage-l-atout-qu-il-faut-pour-vos-candidatures',
		linkLabel: 'Voir plus',
		titleHeadingTag: 'h2',
		titleLabel: 'Une aide exceptionnelle pour l’apprentissage : l’atout qu’il vous faut pour vos candidatures !',
		vertical: false,
	},
	component: ArticleCard,
	title: 'Components/Cards/ArticleCard',
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

export const Horizontal: Story = {
	args: {
		vertical: false,
	},
};

export const Vertical: Story = {
	args: {
		vertical: true,
	},
};
