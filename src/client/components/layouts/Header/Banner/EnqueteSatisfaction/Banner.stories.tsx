import type { Meta,StoryObj } from '@storybook/react';

import { EnqueteSatisfactionBanner } from './EnqueteSatisfactionBanner';

const meta:Meta<typeof EnqueteSatisfactionBanner>={
	component:EnqueteSatisfactionBanner,
	title:'Components/EnqueteSatisfactionBanner',
};

export default meta;
	type Story = StoryObj<typeof EnqueteSatisfactionBanner>;
	
export const Example:Story ={
	args:{
		enqueteUrl:'https://www.1jeune1solution.gouv.fr/',
	},
};
