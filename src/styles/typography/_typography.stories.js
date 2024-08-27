import { ButtonComponent } from '../../client/components/ui/Button/ButtonComponent';
import { Input } from '../../client/components/ui/Form/Input';

const story = {
	title: 'Toolbox/Typography',
};

export default story;

export const TailleDePolice = {
	name: 'Example - Taille de police',

	render: () => (
		<div className="typographie">
			<section className="title">
				<h2>Titres</h2>
				<div className="title-large">
					<h2>Titre large - H2</h2>
					<p>title-large</p>
				</div>
				<div className="title-medium">
					<h2>Titre medium - H3</h2>
					<p>title-medium</p>
				</div>
				<div className="title-small">
					<h2>Titre small - H4</h2>
					<p>title-small</p>
				</div>
			</section>
			<section className="text">
				<h2>Textes</h2>
				<div className="text-large">
					<h2>Texte large</h2>
					<p>text-large</p>
				</div>
				<div className="text-medium">
					<h2>Texte medium</h2>
					<p>text-medium</p>
				</div>
				<div className="text-small">
					<h2>Texte small</h2>
					<p>%text-small</p>
				</div>
				<div className="text-xsmall">
					<h2>Texte XSmall</h2>
					<p>text-xsmall</p>
				</div>
			</section>
			<section className="text-interactive">
				<h2>Texte des contenus interactifs</h2>
				<div className="text-interactive-medium">
					<h2>Contenu interactif médium (champ et label bouton)</h2>
					<p>text-interactive-medium</p>
				</div>
				<div>
					<div className="text-interactive-example">
						<Input className="text-interactive-example-input" label="Label du champ"
									 placeholder="Contenu du champ"
						/>
						<ButtonComponent label="label du bouton"/>
					</div>
				</div>
			</section>
		</div>
	),
};


export const Title = {
	name: 'Example - Titre et sous-titre',

	render: () => (
		<>
			<h2 className="titre-headline">Un titre &quot;headline&quot;</h2>
			<h2 className="titre-subheading">Un sous-titre &quot;subheading&quot;</h2>
		</>
	),
};
