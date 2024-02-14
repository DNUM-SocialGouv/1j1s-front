/**
 * @jest-environment jsdom
 */


import { render, screen } from '@testing-library/react';

import {
	RésultatRechercherAccompagnementTagsList,
} from '~/client/components/features/Accompagnement/Rechercher/Résultat/RésultatRechercherAccompagnementTagsList';
import { TypeÉtablissement } from '~/server/établissement-accompagnement/domain/etablissementAccompagnement';
import {
	anÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/etablissementAccompagnement.fixture';

describe('<RésultatRechercherAccompagnementTagsList/>', () => {
	it('je vois la liste des tags', () => {
		render(<RésultatRechercherAccompagnementTagsList
			etablissement={anÉtablissementAccompagnement({ telephone: '0601010101' })}/>);

		expect(screen.getByRole('list')).toBeVisible();
	});

	describe('téléphone', () => {
		it('lorsque le téléphone n‘est pas présent je ne vois pas de téléphone', () => {
			render(<RésultatRechercherAccompagnementTagsList
				etablissement={anÉtablissementAccompagnement({ telephone: undefined })}/>);
			expect(screen.queryByRole('listitem', { name: 'téléphone de l‘établissement' })).not.toBeInTheDocument();
		});

		it('lorsque le téléphone est présent, je vois le lien de contact par téléphone', () => {
			render(<RésultatRechercherAccompagnementTagsList
				etablissement={anÉtablissementAccompagnement({ telephone: '0601010101' })}/>);
			expect(screen.getByRole('link', { name: '0601010101' })).toHaveAttribute('href', 'tel:0601010101');
		});
	});

	describe('email', () => {
		it('lorsque l‘établissement est mission locale, je n‘affiche pas le mail', () => {
			render(<RésultatRechercherAccompagnementTagsList
				etablissement={anÉtablissementAccompagnement({ email: 'example@example.com', type: TypeÉtablissement.MISSION_LOCALE })}/>);
			expect(screen.queryByRole('listitem', { name: 'email de l‘établissement' })).not.toBeInTheDocument();
		});

		it('lorsque l‘établissement n‘est pas mission locale et que l‘email n‘est pas présent, je ne vois pas d‘email', () => {
			render(<RésultatRechercherAccompagnementTagsList
				etablissement={anÉtablissementAccompagnement({ email: undefined, type: TypeÉtablissement.INFO_JEUNE })}/>);
			expect(screen.queryByRole('listitem', { name: 'email de l‘établissement' })).not.toBeInTheDocument();
		});

		it('lorsque l‘établissement n‘est pas mission locale et que l‘email est présent, je vois l‘adresse email', () => {
			render(<RésultatRechercherAccompagnementTagsList
				etablissement={anÉtablissementAccompagnement({ email: 'example@example.com', type: TypeÉtablissement.INFO_JEUNE })}/>);
			expect(screen.getByRole('listitem', { name: 'email de l‘établissement' })).toHaveTextContent('example@example.com');
		});
	});
});
