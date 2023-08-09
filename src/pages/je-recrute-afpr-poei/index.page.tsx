import JeRecruteAfprPoei from '~/client/components/features/JeRecruteAfprPoei/JeRecruteAfprPoei';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/je-recrute-afpr-poei/index.analytics';
import { CommentCaMarche } from '~/client/components/features/JeRecruteAfprPoei/CommentCaMarche/CommentCaMarche';

export default function JeRecruteAfprPoeiPage() {
	useAnalytics(analytics);

	return (
		<>
			<Head
				title="Je forme les jeunes grâce à l‘emploi | 1jeune1solution"
				description="Votre entreprise recrute ou porte une initiative pour les jeunes ?"
				robots="index,follow"
			/>
			<main id="contenu">
				<JeRecruteAfprPoei />
				<CommentCaMarche/>
			</main>
		</>
	);
}
