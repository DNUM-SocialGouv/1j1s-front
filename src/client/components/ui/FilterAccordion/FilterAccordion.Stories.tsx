import type { Meta,StoryObj } from '@storybook/react';

import { FilterAccordion } from './FilterAccordion';

const meta:Meta<typeof FilterAccordion>={
	component:FilterAccordion,
	title:'Components/FilterAccordion',
};
export default meta;
type Strory=StoryObj<typeof FilterAccordion>;
export const Example:Strory={
	args:{
		open:true,
		title:'titre',
	},
};
