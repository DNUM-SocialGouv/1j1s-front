import clsx from 'clsx';
import React from 'react';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
	{
		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: (
			<>
        Une documentation complète dans une mise en page moderne et facile d'accès,
        voilà les objectifs de la documentation 1jeune1solution. <br /> Avez-vous déjà essayé la recherche ?
			</>
		),
		title: 'Facile d\'utilisation',
	},
	{
		Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: (
			<>
        Il manque quelque chose ? <br />
        vous avez trouvé une erreur ? <br />
        A vous de le corriger
        en proposant un ajout ou un correctif dans le dossier <code>docs</code> du projet.
			</>
		),
		title: 'Facile de contribuer',
	},
	{
		Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: (
			<>
        Grâce aux plugins, les documentations de tous les dépôts de code source 1jeune1solution
        sont réunis, mais en plus les pages sont illustrées et riche de multiples intégrations.
			</>
		),
		title: 'Extensible par nature',
	},
];

function Feature({ title, Svg, description }: FeatureItem) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): JSX.Element {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
