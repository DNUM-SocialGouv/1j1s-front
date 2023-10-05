/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { Label } from '~/client/components/ui/Form/InputText/Label';

describe('<Label>', () => {
	it('je vois le label', () => {
		render(<Label>Je suis le label</Label>);
		expect(screen.getByText('Je suis le label')).toBeVisible();
	});

	it('je vois le complément du label', () => {
		render(<Label>
			Je suis le label
			<Label.Complement>Je suis le complément</Label.Complement>
		</Label>);
		expect(screen.getByText(/Je suis le complément/)).toBeVisible();
	});

	it('lorsque le champ est obligatoire, je vois l‘indicateur obligatoire', () => {
		render(<Label>
			Je suis le label <Label.Required/>
		</Label>);
		expect(screen.getByText(/(champ obligatoire)/)).toBeVisible();
	});

	it('lorsque le champ est optionnel, je vois l‘indicateur optionnel', () => {
		render(<Label>
			Je suis le label <Label.Optional/>
		</Label>);
		expect(screen.getByText(/(champ optionnel)/)).toBeVisible();
	});

	it('accepte une classe', () => {
		render(<Label className="className">Je suis le label</Label>);

		const label = screen.getByText('Je suis le label');
		expect(label).toHaveAttribute('class', expect.stringContaining('className'));
	});
});
