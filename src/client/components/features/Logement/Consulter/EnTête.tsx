import { AnnonceDeLogement } from '../AnnonceDeLogement.type';

export const EnTête = (props: AnnonceDeLogement.EnTête) => {
	const { titre, type, typeBien, dateDeMiseAJour } = props;
	return (
		<>
			<div>
				<span>Annonce mise à jour le {dateDeMiseAJour}</span>
				<span>{type} - {typeBien}</span>
			</div>
			<h1>{titre}</h1>
		</>
	);
};
