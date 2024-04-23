/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen } from '@testing-library/react';

import { Image } from '~/client/components/ui/Img/Image';

describe('<Image />', () => {
	it('affiche un placeholder quand l’image est en erreur', () => {
		render(<Image src="/invalid" alt="" width={320} height={320} />);

		const image = screen.getByRole('presentation');
		fireEvent.error(image);

		expect(image).toHaveAttribute('src', expect.stringContaining('placeholder.webp'));
	});
	it('appelle onError quand une erreur survient', () => {
		const onError = jest.fn();
		render(<Image src="/invalid" alt="" width={320} height={320} onError={onError} />);

		const image = screen.getByRole('presentation');
		fireEvent.error(image);

		expect(onError).toHaveBeenCalledTimes(1);
	});
});
