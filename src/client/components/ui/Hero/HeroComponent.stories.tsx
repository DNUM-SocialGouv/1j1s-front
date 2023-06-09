import{ Meta,StoryObj } from '@storybook/react';

import { HeroComponent } from './HeroComponent';

const meta:Meta<typeof HeroComponent>= {
	component: HeroComponent,
	title: 'Components/HerosComponents',
};
export default meta;
type Story = StoryObj <typeof HeroComponent>;

export const Example:Story={
	args:{
		additionalInformation:'information suplémentaire',
		imgSrc:'string',
		titlePrimaryText:'Je suis un titre primaire',
		titleSecondaryText:'Je suis un titre secondaire',
	},  
};
