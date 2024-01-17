import { BackButton } from '~/client/components/features/ButtonRetour/BackButton';
import { Stage3eEt2deCandidaterPageProps } from '~/pages/stages-3e-et-2de/candidater/index.page';


export default function CandidaterStage3eEt2de(props: Stage3eEt2deCandidaterPageProps) {
	const {
		nomEntreprise,
		siret,
		modeDeContact,
		appellations,
	} = props;

	return <div>
		<h1>Je candidate à l’offre de stage de 3e et 2de de l’entreprise {nomEntreprise}</h1>
		<p>Cette entreprise souhaite être contactée par téléphone. Merci de nous indiquer vos coordonnées.</p>
		<p>Nous allons vous transmettre par e-mail le nom de la personne à contacter, son numéro de téléphone ainsi que des
			conseils pour présenter votre demande d’immersion. Ces informations sont personnelles et confidentielles. Elles ne
			peuvent pas être communiquées à d’autres personnes.</p>

		<BackButton label={'Retour à la recherche'}/>

	</div>;
}
