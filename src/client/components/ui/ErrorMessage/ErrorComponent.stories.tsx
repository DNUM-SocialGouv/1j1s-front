import type { Meta, StoryObj } from '@storybook/react';

import { ErrorComponent } from './ErrorComponent';

const meta:Meta<typeof ErrorComponent>={
	component:ErrorComponent,
	title:'Components/ErrorMessageComponent',     
};

export default  meta;

type Story=StoryObj<typeof ErrorComponent>;

export const Example:Story={
	args:{
		errorType:'',
            
	},
};
