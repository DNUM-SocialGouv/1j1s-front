/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Accessibilite from '~/pages/accessibilite/index.page';

describe('<Accessibilite />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const titre = 'Accessibilité';
		const contenu = `# Déclaration d'accessibilité
06/10/2022

1 jeune 1 solution s’engage à rendre ses sites internet accessibles conformément à l’article 47 de la loi n°2005-102 du 11 février 2005. 
Cette déclaration d'accessibilité s'applique à [1 jeune 1 solution](www.1jeune1solution.gouv.fr).

## État de conformité
Le site [1 jeune 1 solution](www.1jeune1solution.gouv.fr) est en conformité partielle avec le référentiel général d’amélioration de l’accessibilité (RGAA), version 4.1 en raison des non-conformités et des dérogations énumérées ci-dessous.

### Résultats des tests
L’audit de conformité réalisé par Urbilog révèle que **61 %** des critères du RGAA version 4.1 sont respectés. 
Le taux moyen de conformité du site s’élève à **75 %**. 

Vous pouvez consulter le rapport d'audit détaillé au format PDF.

On compte 54 critères applicables sur 106 parmi lesquels :
- 33 critères conformes
- 21 critères non-conformes

### Contenus non-accessibles
Les contenus listés ci-dessous ne sont pas accessibles pour les raisons suivantes :

#### Non conformité

- Présence d’alternatives non vide sur des images décoratives.
- Des alternatives textuelles non pertinente sur des image informatives.
- Un titre de cadre non pertinent.
- Des liens non pertinents
- Des éléments non compatibles avec les technologies d’assistance
- Des éléments non compatibles avec la navigation au clavier
- Des changements de contexte non renseignés
- Des messages de statut qui ne sont pas restitués.

8. éléments obligatoires
Un titre de la page n’est pas présent.
Des éléments HTML utilisés à des fins de présentation.

9. structuration de l'information
Plan de titrage absent ou ne respectant pas la hiérarchie des titres.
Structure du document non cohérente.
Énumération à coder comme une liste.

10. présentation de l'information
Lien non visible par rapport au texte environnant.
Prise de focus non perceptible.
Prise de focus pas assez perceptible.

11. formulaires
Champ de saisie sans étiquette.
Intitulé incomplet sur les boutons.

12. navigation
Absence de deux systèmes de navigation.
Lien d'accès rapide non fonctionnel
Ordre de tabulation non cohérent

13. consultation

### Dérogation pour charge disproportionnée
●\tRAS

### Contenus non-soumis à l'obligation d'accessibilité
●\tSolution externe de gestion des offres emploi, de stage et d’alternance

### Établissement de cette déclaration d'accessibilité
Cette déclaration d'accessibilité a été établie le 06.10.2022
Technologies utilisées pour la réalisation du site du ministère des Solidarités et de la Santé - [1 jeune 1 solution](www.1jeune1solution.gouv.fr)
●\tHTML 5
●\tCSS
●\tJavascript

### Environnement de test
Les vérifications de restitution de contenus ont été réalisées sur la base de la combinaison fournie par la base de référence du RGAA 4.1, avec les versions suivantes :
●\tNVDA 2019.2.1 et Firefox
●\tJAWS 2018 et Internet Edge
●\tVoiceOver Mac OS 10.14 et Safari : 13.0.3

### Outils pour évaluer l'accessibilité
●\tContrast Color Analyser
●\tAssistant RGAA V4.1
●\tWeb Developer toolbar
●\tInspecteur du navigateur

### Pages du site ayant fait l'objet de la vérification de conformité

Accueil : https://www.1jeune1solution.gouv.fr ; 
Mentions légales : https://www.1jeune1solution.gouv.fr/mentions-legales ; 
Accessibilité : https://www.1jeune1solution.gouv.fr/accessibilite ; 
Emplois : https://www.1jeune1solution.gouv.fr/emplois ; 
Offre (redirection vers le détail de l’offre au clic sur une offre) ; 
Formation : https://www.1jeune1solution.gouv.fr/formations ; 
Contrat d’engagement jeune : https://www.1jeune1solution.gouv.fr/contrat-engagement-jeune ; 
Les entreprises s'engagent : https://www.1jeune1solution.gouv.fr/les-entreprises-s-engagent ; 
Mes aides : https://www.1jeune1solution.gouv.fr/mes-aides ; 
Les mesures jeunes : https://www.1jeune1solution.gouv.fr/espace-jeune ; 
Article : (redirection vers les différents articles au clic sur « En savoir plus ») ; 
Stage : https://www.1jeune1solution.gouv.fr/stages ; 
Alternance : https://www.1jeune1solution.gouv.fr/apprentissage.

### Retour d'information et contact
Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter 1 jeunes 1 pour être orienté vers une alternative accessible ou obtenir le contenu sous une autre forme.
Envoyez un message à contact-1j1s@sg.social.gouv.fr. 

### Voies de recours
Cette procédure est à utiliser dans le cas suivant. Vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu de réponse satisfaisante.

- Écrire un message au Défenseur des droits - [https://formulaire.defenseurdesdroits.fr/]
- Contacter le délégué du Défenseur des droits dans votre région - [https://www.defenseurdesdroits.fr/saisir/delegues]
- Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) : Défenseur des droits Libre réponse 71120 75342 Paris`;

		const { container } = render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<Accessibilite titre={titre} contenu={contenu}/>);
			</DependenciesProvider>);

		expect(container).toBeAccessible();
	});
});
