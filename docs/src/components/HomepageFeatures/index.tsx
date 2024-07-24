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
		Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: (
			<>
        Toutes les informations à connaitre sur le projet Front permettant d'améliorer l'apparence visuelle et la lisibilité des informations affichées sur 1Jeune1Solution mais également certains éléments comme le tracking ou l'affichage des données en provenance du CMS. 
			</>
		),
		title: 'Le projet 1J1S-Front',
	},
	{
		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: (
			<>
        Toutes les informations à connaitre sur le projet ETL permettant l'extraction, la transformation et le chargement de données provenant de multiples sources telles que les offres de logements étudiant.
			</>
		),
		title: 'Le projet 1J1S-ETL',
	},
	{
		Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: (
			<>
        Toutes les informations à connaitre sur le projet CMS, qui permet la mise en place du système de gestion de contenu à destination des chargés de déploiement. Ils auront la main pour créer, modifier et publier du contenu web tels que les articles ou les services jeunes. 
			</>
		),
		title: 'Le projet 1J1S-CMS',
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
