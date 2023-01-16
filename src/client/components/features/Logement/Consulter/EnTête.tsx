import styles from './EnTête.module.scss';

interface EnTêteProps {
	annonce: {
		titre: string
		type: string
		typeBien: string
		dateDeMiseAJour: string
	}
}

function formatDate(date: Date): string {
	const day = date.toLocaleDateString(undefined, { day: '2-digit' });
	const month = date.toLocaleDateString(undefined, { month: '2-digit' });
	const year = date.toLocaleDateString(undefined, { year: 'numeric' });
	return `${day}.${month}.${year}`;
}

export const EnTête = (props: EnTêteProps) => {
	const { annonce: { titre, type, typeBien, dateDeMiseAJour: dateMAJString } } = props;
	const dateMAJ = new Date(dateMAJString);
	return (
		<header className={styles.annonceEntête}>
			<h1>{titre}</h1>
			<span className={styles.date}>Annonce mise à jour le <time dateTime={dateMAJ.toISOString()}>
				{formatDate(dateMAJ)}
			</time></span>
			<span className={styles.type}>{type} - {typeBien}</span>
		</header>
	);
};
