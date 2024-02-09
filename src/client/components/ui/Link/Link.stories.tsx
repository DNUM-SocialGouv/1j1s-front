import { Meta, StoryObj } from '@storybook/react';

import { Link, LinkIcon } from './Link';


const meta: Meta<typeof Link> = {
	component: Link,
	title: 'Components/Link',
};

export default meta;
type Story = StoryObj<typeof Link>;
type IconStory = StoryObj<typeof Link.Icon>;
export const exemple: Story = {
	args: {
		href: 'https://example.com',
	},
	render: (args) => (
		<Link {...args}>
			Cliquez ici
		</Link>
	),
};
export const LinkWithDefaultIcon: Story = {
	args: {
		href: 'https://example.com',
	},
	render: (args) => {
		return (
			<Link {...args}>
				Cliquez ici
				<Link.Icon/>
			</Link>);
	},
};

export const LinkWithCustomizeIcon: IconStory = {
	args: {
		name:'account',
	},
	render: (args) => {
		return (
			<Link href="#emplois" appearance={'asPrimaryButton'}>
				Cliquez ici
				<Link.Icon {...args}/>
			</Link>);
	},
};

export const LinkPrimaryWithLeftIcon: IconStory = {
	args: {
		name:'account',
		position: 'left',
	},
	render: (args) => {
		return (
			<Link href="#emplois" appearance={'asPrimaryButton'}>
				Cliquez ici
				<Link.Icon {...args}/>
			</Link>);
	},
};

export const LinkWithoutStyleWithLeftIcon: IconStory = {
	args: {
		name:'account',
		position: 'left',
	},
	render: (args) => {
		return (
			<Link href="#emplois" >
				Cliquez ici
				<Link.Icon {...args}/>
			</Link>);
	},
};
