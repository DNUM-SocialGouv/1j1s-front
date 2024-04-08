import './_colors.stories.scss';

export default {
	title: 'Toolbox/Colors',
};

export const ExampleColors = {
	name: 'Example - Colors',

	render: () => (
		<div className="colors">
			<section className="colors-main">
				<h2>Couleurs Principales</h2>
				<ul>
					<li>
						<div className="color-primary" />
						<p>Couleur Primaire</p>
						<p>$color-primary</p>
						<p>#566BB1</p>
					</li>
					<li>
						<div className="color-secondary" />
						<p>Couleur Secondaire</p>
						<p>$color-secondary</p>
						<p>#18753C</p>
					</li>
					<li>
						<div className="color-tertiary" />
						<p>Couleur Tertiaire</p>
						<p>$color-tertiary</p>
						<p>#ECECFF</p>
					</li>
				</ul>
			</section>
			<section className="colors-system">
				<h2>Couleurs Système</h2>
				<ul>
					<li>
						<div className="color-error" />
						<p>Erreur</p>
						<p>$color-error</p>
						<p>#CE0500</p>
					</li>
					<li>
						<div className="color-warning" />
						<p>Warning</p>
						<p>$color-warning</p>
						<p>#F5EDF5</p>
					</li>
					<li>
						<div className="color-success" />
						<p>Succes</p>
						<p>$color-success</p>
						<p>#18753C</p>
					</li>
					<li>
						<div className="color-disabled" />
						<p>Inactif</p>
						<p>$color-disabled</p>
						<p>#929292</p>
					</li>
					<li>
						<div className="color-disabled-background" />
						<p>Inactif background</p>
						<p>$color-disabled-background</p>
						<p>#EEEEEE</p>
					</li>
				</ul>
			</section>
			<section className="colors-background">
				<h2>Couleurs Background</h2>
				<ul>
					<li>
						<div className="color-background-primary" />
						<p>Background primaire</p>
						<p>$color-background-primary</p>
						<p>#FFFFFF</p>
					</li>
					<li>
						<div className="color-background-primary-alternative" />
						<p>Background primaire alternative</p>
						<p>$color-background-primary-alternative</p>
						<p>#F6F7FB</p>
					</li>
					<li>
						<div className="color-background-secondary" />
						<p>Background secondaire</p>
						<p>$color-background-secondary</p>
						<p>#566BB1</p>
					</li>
					<li>
						<div className="color-background-border" />
						<p>Background bordure</p>
						<p>$color-background-border</p>
						<p>#929292</p>
					</li>
					<li>
						<div className="color-background-tag" />
						<p>Background tag</p>
						<p>$color-background-tag</p>
						<p>#EEEEEE</p>
					</li>
				</ul>
			</section>
			<section className="colors-textual-elements">
				<h2>Elements textuels</h2>
				<ul>
					<li>
						<div className="color-title-primary" />
						<p>Titre primaire</p>
						<p>$color-title-primary</p>
						<p>#566BB1</p>
					</li>
					<li>
						<div className="color-title-primary-contrast" />
						<p>Titre primaire contraste</p>
						<p>$color-title-primary-contrast</p>
						<p>#566BB1</p>
					</li>
					<li>
						<div className="color-title-primary-alternative" />
						<p>Titre primaire alternative</p>
						<p>$color-title-primary-alternative</p>
						<p>#161616</p>
					</li>
					<li>
						<div className="color-title-secondary" />
						<p>Titre secondaire</p>
						<p>$color-title-secondary</p>
						<p>#FFFFFFF</p>
					</li>
					<li>
						<div className="color-text-primary" />
						<p>Texte primaire</p>
						<p>$color-text-primary</p>
						<p>#161616</p>
					</li>
					<li>
						<div className="color-text-primary-inverse" />
						<p>Texte primaire inversé</p>
						<p>$color-text-primary-inverse</p>
						<p>#FFFFFFF</p>
					</li>
					<li>
						<div className="color-text-primary-alternative" />
						<p>Texte primaire alternative</p>
						<p>$color-text-primary-alternative</p>
						<p>#566BB1</p>
					</li>
					<li>
						<div className="color-text-secondary" />
						<p>Texte secondaire</p>
						<p>$color-text-secondary</p>
						<p>#666666</p>
					</li>
				</ul>
			</section>
			<section className="colors-cta">
				<h2>Couleurs CTA</h2>
				<section className="colors-cta-background">
					<h3>Couleurs background boutons</h3>
					<ul>
						<li>
							<div className="color-cta-background-primary" />
							<p>Primaire Defaut</p>
							<p>$color-cta-background-primary</p>
							<p>#566BB1</p>
						</li>
						<li>
							<div className="color-cta-background-primary-hover" />
							<p>Primaire Survol</p>
							<p>$color-cta-background-primary-hover</p>
							<p>#040085</p>
						</li>
						<li>
							<div className="color-cta-background-secondary" />
							<p>Secondaire Defaut</p>
							<p>$color-cta-background-secondary</p>
							<p>#FFFFFF</p>
						</li>
						<li>
							<div className="color-cta-background-secondary-hover" />
							<p>Secondaire Survol</p>
							<p>$color-cta-background-secondary-hover</p>
							<p>#ECECFF</p>
						</li>
						<li>
							<div className="color-cta-background-tertiary" />
							<p>Tertiaire Defaut</p>
							<p>$color-cta-background-tertiary</p>
							<p>#ECECFF</p>
						</li>
						<li>
							<div className="color-cta-background-tertiary-hover" />
							<p>Tertiaire Survol</p>
							<p>$color-cta-background-tertiary-hover</p>
							<p>#6E61E9</p>
						</li>
						<li>
							<div className="color-cta-background-inactive" />
							<p>Inactif</p>
							<p>$color-cta-background-inactive</p>
							<p>#929292</p>
						</li>
						<li />
					</ul>
				</section>
				<section className="colors-cta-texte">
					<h3>Couleurs textes boutons</h3>
					<ul>
						<li>
							<div className="color-cta-texte-primary" />
							<p>Primaire defaut</p>
							<p>$color-cta-texte-primary</p>
							<p>#FFFFFF</p>
						</li>
						<li>
							<div className="color-cta-texte-primary-hover" />
							<p>Primaire survol</p>
							<p>$color-cta-texte-primary-hover</p>
							<p>#FFFFFF</p>
						</li>
						<li>
							<div className="color-cta-texte-secondary" />
							<p>Secondaire defaut</p>
							<p>$color-cta-texte-secondary</p>
							<p>#566BB1</p>
						</li>
						<li>
							<div className="color-cta-texte-secondary-hover" />
							<p>Secondaire survol</p>
							<p>$color-cta-texte-secondary-hover</p>
							<p>#566BB1</p>
						</li>
						<li>
							<div className="color-cta-texte-tertiary" />
							<p>Tertiaire Defaut</p>
							<p>$color-cta-texte-tertiary</p>
							<p>#566BB1</p>
						</li>
						<li>
							<div className="color-cta-texte-tertiary-hover" />
							<p>Tertiaire Survol</p>
							<p>$color-cta-texte-tertiary-hover</p>
							<p>#FFFFFF</p>
						</li>
						<li>
							<div className="color-cta-texte-inactive" />
							<p>Inactif</p>
							<p>$color-cta-texte-inactive</p>
							<p>#FFFFFF</p>
						</li>
					</ul>
				</section>
				<section className="colors-cta-link">
					<h3>Couleurs liens</h3>
					<ul>
						<li>
							<div className="color-cta-link-background-light" />
							<p>Background clair</p>
							<p>$color-cta-link-background-light</p>
							<p>#566BB1</p>
						</li>
						<li>
							<div className="color-cta-link-background-dark" />
							<p>Background foncé</p>
							<p>$color-cta-link-background-dark</p>
							<p>#FFFFFF</p>
						</li>
						<li>
							<div className="color-cta-link-inactive" />
							<p>Inactif</p>
							<p>$color-cta-link-inactive</p>
							<p>#929292</p>
						</li>
					</ul>
				</section>
			</section>
			<section className="colors-complementary">
				<h2>Couleurs Complémentaires</h2>
				<section className="colors-group-1">
					<h3>
            Groupe 1 (utilisé comme background de différentes sections au sein
            d’une même page - voir homepage)
					</h3>
					<ul>
						<li>
							<div className="color-group-1-purple" />
							<p>Violet groupe 1</p>
							<p>$color-group-1-purple</p>
							<p>#ECECFF</p>
						</li>
						<li>
							<div className="color-group-1-pink" />
							<p>Rose groupe 1</p>
							<p>$color-group-1-pink</p>
							<p>#F5EDF5</p>
						</li>
						<li>
							<div className="color-group-1-green" />
							<p>Vert groupe 1</p>
							<p>$color-group-1-green</p>
							<p>#E7F1F1</p>
						</li>
						<li>
							<div className="color-group-1-orange" />
							<p>Orange groupe 1</p>
							<p>$color-group-1-orange</p>
							<p>#FFF4ED</p>
						</li>
					</ul>
				</section>
				<section className="colors-group-2">
					<h3>
            Groupe 2 (utilisé comme background d’étiquettes présentes sur les
            cartes services jeunes)
					</h3>
					<ul>
						<li>
							<div className="color-group-2-rust" />
							<p>Rouille groupe 2</p>
							<p>$color-group-2-rust</p>
							<p>#A66465</p>
						</li>
						<li>
							<div className="color-group-2-dark-green" />
							<p>Vert foncé groupe 2</p>
							<p>$color-group-2-dark-green</p>
							<p>#455A64</p>
						</li>
						<li>
							<div className="color-group-2-light-green" />
							<p>Vert clair groupe 2</p>
							<p>$color-group-2-light-green</p>
							<p>#61803E</p>
						</li>
						<li>
							<div className="color-group-2-burgundy" />
							<p>Bordeaux groupe 2</p>
							<p>$color-group-2-burgundy</p>
							<p>#6E445A</p>
						</li>
					</ul>
				</section>
				<section className="colors-group-3">
					<h3>
            Groupe 3 (utilisé comme background de cartes spécifiques comme pour
            la page FAQ)
					</h3>
					<ul>
						<li>
							<div className="color-group-3-purple" />
							<p>Violet groupe 3</p>
							<p>$color-group-3-purple</p>
							<p>#566BB1</p>
						</li>
						<li>
							<div className="color-group-3-green" />
							<p>Vert groupe 3</p>
							<p>$color-group-3-green</p>
							<p>#F5EDF5</p>
						</li>
						<li>
							<div className="color-group-3-brown" />
							<p>Marron groupe 3</p>
							<p>$color-group-3-brown</p>
							<p>#7F3E3B</p>
						</li>
						<li>
							<div className="color-group-3-yellow" />
							<p>Jaune groupe 3</p>
							<p>$color-group-3-yellow</p>
							<p>#FFF4ED</p>
						</li>
						<li>
							<div className="color-group-3-pink" />
							<p>Rose groupe 3</p>
							<p>$color-group-3-pink</p>
							<p>#7F3E3B</p>
						</li>
						<li>
							<div className="color-group-3-blue" />
							<p>Bleu groupe 3</p>
							<p>$color-group-3-blue</p>
							<p>#7F3E3B</p>
						</li>
					</ul>
				</section>
			</section>
		</div>
	),
};
