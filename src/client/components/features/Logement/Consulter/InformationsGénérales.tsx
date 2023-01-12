import { AnnonceDeLogement } from '../AnnonceDeLogement.type';

export const InformationsGénérales = (props: AnnonceDeLogement.InformationsGénérales) => {
	const { surface } = props;
	return (
		<section>
			<h2>Informations Générales</h2>
			<span>{surface}</span>
		</section>
	);
};
