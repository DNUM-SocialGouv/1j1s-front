import { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';


const meta: Meta<typeof Link> = {
	component: Link,
	title: 'Components/Link',
};

export default meta;
type Story = StoryObj<typeof Link>;
type IconStory = StoryObj<typeof Link.Icon>;
export const LinkWithDefaultIcon: Story = {
	args: {
		href: 'https://example.com',
	},
	render: (args) => {
		return (
			<Link {...args}>
				Cliquez ici
				<Link.Icon/>
			</Link>
		);
	},
};

export const QuaternaryLinkWithCustomizedIcon: IconStory = {
	args: {
		name: 'account',
	},
	render: (args) => {
		return (
			<Link href="#emplois" appearance={'asQuaternaryButton'}>
				Cliquez ici
				<Link.Icon {...args}/>
			</Link>
		);
	},
};

export const LinkPrimaryWithLeftIcon: IconStory = {
	args: {
		name: 'account',
	},
	render: (args) => {
		return (
			<Link href="#emplois" appearance={'asPrimaryButton'}>
				<Link.Icon {...args}/>
				Cliquez ici
			</Link>
		);
	},
};

export const LinkWithLeftIcon: IconStory = {
	args: {
		name: 'account',
	},
	render: (args) => {
		return (
			<Link href="#emplois">
				<Link.Icon {...args}/>
				Cliquez ici
			</Link>
		);
	},
};
