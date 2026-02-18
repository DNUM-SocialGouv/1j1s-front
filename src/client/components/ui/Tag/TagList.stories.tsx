import type { Meta, StoryObj } from '@storybook/nextjs';

import { TagList } from './TagList';

const meta: Meta<typeof TagList> = {
	component: TagList,
	title: 'Components/Tags/TagList',
};

export default meta;
type Story = StoryObj<typeof TagList>;

export const Example: Story = {
	args: {
		list: ['Ceci est un tag', 'Ceci est un autre tag', <a key="1" href={'https://1jeune1solution.gouv.fr'}> Ceci est un tag qui contient un lien</a>],
	},
};

