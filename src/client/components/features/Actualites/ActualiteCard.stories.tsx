import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { anActualite } from '../../../../server/actualites/domain/actualite.fixture';
import ActualiteCard from './ActualiteCard';

const meta: Meta<typeof ActualiteCard> = {
	argTypes: {
		actualite: {
			control: 'object',
		},
	},
	args: {
		actualite: anActualite(),
	},
	component: ActualiteCard,
	title: 'Components/Cards/ActualiteCard',
};

export default meta;

type Story = StoryObj<React.ComponentPropsWithRef<typeof ActualiteCard>>;
export const Default: Story = {};
export const lienExterne: Story = {
	args: {
		actualite: anActualite({ article: undefined, link: 'https://www.example.com/test' }),
	},
};
export const ContenuCourt: Story = {
	args: {
		actualite: anActualite({
			contenu: '💪 Relevez le défi du Mois et découvrez tous les bienfaits d\'une vie sans tabac !',
			titre: 'Le Mois sans tabac revient !',
		}),
	},
};
