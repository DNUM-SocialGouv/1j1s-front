import * as process from 'process';

import { getServerSideProps } from './index.page';

describe('<ApprentissageEntreprises />', () => {
	it('renvoie 404 quand la page est feature flippé off', async () => {
		process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '0';

		const result = await getServerSideProps();

		expect(result).toMatchObject({ notFound: true });
	});
	it('renvoie les props quand la page est feature flippé on', async () => {
		process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE = '1';

		const result = await getServerSideProps();

		expect(result).toMatchObject({ props: {} });
	});
});
