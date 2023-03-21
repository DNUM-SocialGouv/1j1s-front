/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { KeyBoard } from '~/client/components/keyboard.fixture';
import { Tab, TabPanel, Tabs, TabsLabel } from '~/client/components/ui/Tab/Tab';

const onglet1Panel = 'Je suis le paragraphe de l’onglet 1';
const onglet2Panel = 'Je suis le paragraphe de l’onglet 2';

describe('<Tab>', () => {
	describe('lorsque j’affiche des onglets', () => {
		it('je vois des onglets', () => {
			render(<Tabs>
				<TabsLabel>
					<Tab>onglet 1</Tab>
					<Tab aria-controls={'control-1'}>onglet 2</Tab>
				</TabsLabel>
				<TabPanel>
					<p>{onglet1Panel}</p>
				</TabPanel>
				<TabPanel>
					<p>{onglet2Panel}</p>
				</TabPanel>
			</Tabs>);

			const [tabLabel1, tabLabel2] = screen.getAllByRole('tab');
			expect(tabLabel1).toBeVisible();
			expect(tabLabel1).toHaveAttribute('aria-selected', 'true');
			expect(tabLabel1).toHaveAttribute('aria-controls', 'panel-0');
			expect(tabLabel1).toHaveAttribute('tabIndex', '0');

			expect(tabLabel2).toBeVisible();
			expect(tabLabel2).toHaveAttribute('aria-selected', 'false');
			expect(tabLabel2).toHaveAttribute('aria-controls', 'panel-1 control-1');
			expect(tabLabel2).toHaveAttribute('tabIndex', '-1');


			const tabPanel = screen.getByRole('tabpanel');
			expect(within(tabPanel).getByText(onglet1Panel)).toBeVisible();
			expect(screen.queryByText(onglet2Panel)).not.toBeInTheDocument();
		});
	});

	describe('lorsque je click sur un onglet', () => {
		it('je change d’onglet', async () => {
			const user = userEvent.setup();

			render(<Tabs>
				<TabsLabel>
					<Tab>onglet 1</Tab>
					<Tab>onglet 2</Tab>
				</TabsLabel>
				<TabPanel>
					<p>{onglet1Panel}</p>
				</TabPanel>
				<TabPanel>
					<p>{onglet2Panel}</p>
				</TabPanel>
			</Tabs>);
			const [tabLabel1, tabLabel2] = screen.getAllByRole('tab');

			await user.click(tabLabel2);

			expect(tabLabel1).toHaveAttribute('aria-selected', 'false');
			expect(tabLabel2).toHaveAttribute('aria-selected', 'true');

			const tabPannelList = screen.getByRole('tabpanel');
			expect(within(tabPannelList).getByText(onglet2Panel)).toBeVisible();
			expect(screen.queryByText(onglet1Panel)).not.toBeInTheDocument();
		});
	});

	describe('lorsque je navigue avec la fleche gauche du clavier', () => {
		describe('lorsque je ne suis pas sur le premier élément', () => {
			it('je change d’onglet', async () => {
				const user = userEvent.setup();

				render(<Tabs>
					<TabsLabel>
						<Tab>onglet 1</Tab>
						<Tab>onglet 2</Tab>
					</TabsLabel>
					<TabPanel>
						<p>{onglet1Panel}</p>
					</TabPanel>
					<TabPanel>
						<p>{onglet2Panel}</p>
					</TabPanel>
				</Tabs>);

				const [tabLabel1, tabLabel2] = screen.getAllByRole('tab');
				await tabLabel2.focus();

				await user.keyboard(KeyBoard.ARROW_LEFT);
				expect(tabLabel1).toHaveFocus();

				await user.keyboard(KeyBoard.ENTER);
				expect(screen.getByText(onglet1Panel)).toBeVisible();
			});
		});
		describe('lorsque je suis sur le premier élément', () => {
			it('je me déplace sur le dernier élément', async () => {
				const user = userEvent.setup();

				render(<Tabs>
					<TabsLabel>
						<Tab>onglet 1</Tab>
						<Tab>onglet 2</Tab>
					</TabsLabel>
					<TabPanel>
						<p>{onglet1Panel}</p>
					</TabPanel>
					<TabPanel>
						<p>{onglet2Panel}</p>
					</TabPanel>
				</Tabs>);

				const [tabLabel1, tabLabel2] = screen.getAllByRole('tab');
				await tabLabel1.focus();

				await user.keyboard(KeyBoard.ARROW_LEFT);
				expect(tabLabel2).toHaveFocus();

				await user.keyboard(KeyBoard.ENTER);
				expect(screen.getByText(onglet2Panel)).toBeVisible();
			});
		});
	});
});
describe('lorsque je navigue avec la fleche droite du clavier', () => {
	describe('lorsque je ne suis pas sur le dernier élément', () => {
		it('je change d’onglet', async () => {
			const user = userEvent.setup();

			render(<Tabs>
				<TabsLabel>
					<Tab>onglet 1</Tab>
					<Tab>onglet 2</Tab>
				</TabsLabel>
				<TabPanel>
					<p>{onglet1Panel}</p>
				</TabPanel>
				<TabPanel>
					<p>{onglet2Panel}</p>
				</TabPanel>
			</Tabs>);

			const [tabLabel1, tabLabel2] = screen.getAllByRole('tab');
			await tabLabel1.focus();

			await user.keyboard(KeyBoard.ARROW_RIGHT);
			expect(tabLabel2).toHaveFocus();

			await user.keyboard(KeyBoard.ENTER);
			expect(screen.getByText(onglet2Panel)).toBeVisible();
		});
	});
	describe('lorsque je suis sur le dernier élément', () => {
		it('je me déplace sur le premier élément', async () => {
			const user = userEvent.setup();

			render(<Tabs>
				<TabsLabel>
					<Tab>onglet 1</Tab>
					<Tab>onglet 2</Tab>
				</TabsLabel>
				<TabPanel>
					<p>{onglet1Panel}</p>
				</TabPanel>
				<TabPanel>
					<p>{onglet2Panel}</p>
				</TabPanel>
			</Tabs>);

			const [tabLabel1, tabLabel2] = screen.getAllByRole('tab');
			await tabLabel2.focus();

			await user.keyboard(KeyBoard.ARROW_RIGHT);
			expect(tabLabel1).toHaveFocus();

			await user.keyboard(KeyBoard.ENTER);
			expect(screen.getByText(onglet1Panel)).toBeVisible();
		});
	});
});

describe('lorsque je navigue avec la touche début du clavier', () => {
	it('je me déplace sur le premier onglet', async () => {
		const user = userEvent.setup();
		const onglet3Panel = 'Je suis le paragraphe de l’onglet 3';

		render(<Tabs>
			<TabsLabel>
				<Tab>onglet 1</Tab>
				<Tab>onglet 2</Tab>
				<Tab>onglet 3</Tab>
			</TabsLabel>
			<TabPanel>
				<p>{onglet1Panel}</p>
			</TabPanel>
			<TabPanel>
				<p>{onglet2Panel}</p>
			</TabPanel>
			<TabPanel>
				<p>{onglet3Panel}</p>
			</TabPanel>
		</Tabs>);

		const [tabLabel1, tabLabel3] = screen.getAllByRole('tab');
		await tabLabel3.focus();

		await user.keyboard(KeyBoard.HOME);
		expect(tabLabel1).toHaveFocus();

		await user.keyboard(KeyBoard.ENTER);
		expect(screen.getByText(onglet1Panel)).toBeVisible();
	});
});
describe('lorsque je navigue avec la touche fin du clavier', () => {
	it('je me déplace sur le dernier onglet', async () => {
		const user = userEvent.setup();
		const onglet3Panel = 'Je suis le paragraphe de l’onglet 3';

		render(<Tabs>
			<TabsLabel>
				<Tab>onglet 1</Tab>
				<Tab>onglet 2</Tab>
				<Tab>onglet 3</Tab>
			</TabsLabel>
			<TabPanel>
				<p>{onglet1Panel}</p>
			</TabPanel>
			<TabPanel>
				<p>{onglet2Panel}</p>
			</TabPanel>
			<TabPanel>
				<p>{onglet3Panel}</p>
			</TabPanel>
		</Tabs>);

		const [tabLabel1, tabLabel2, tabLabel3] = screen.getAllByRole('tab');
		await tabLabel1.focus();

		await user.keyboard(KeyBoard.END);
		expect(tabLabel2).not.toHaveFocus();
		expect(tabLabel3).toHaveFocus();

		await user.keyboard(KeyBoard.ENTER);
		expect(screen.getByText(onglet3Panel)).toBeVisible();
	});
});
