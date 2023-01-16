type DescriptionDuLogementProps = {
	description: string,
}

export const DescriptionDuLogement = ({ description }: DescriptionDuLogementProps) => {
	return (
		<section>
			<h2>Description du Logement</h2>
			<p>{description}</p>
		</section>
	);
};
