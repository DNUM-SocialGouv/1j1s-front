import { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles
	from '~/client/components/features/EmploisEurope/FormulaireRecherche/FormulaireRechercheEmploisEurope.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { FilterAccordion } from '~/client/components/ui/FilterAccordion/FilterAccordion';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import { tempsDeTravailEures } from '~/client/domain/codesTempsTravailEures';
import { niveauEtudesEures } from '~/client/domain/niveauEtudesEures';
import { secteurActiviteEures } from '~/server/emplois-europe/infra/secteurActiviteEures';
import { typesContratEures } from '~/server/emplois-europe/infra/typesContratEures';

export function ModaleFiltreAvancee(props: {
	close: () => void,
	open: boolean,
	toggleTypeContrat: (typeContrat: string) => void,
	toggleTempsDeTravail: (tempsDeTravail: string) => void,
	toggleNiveauEtude: (niveauEtude: string) => void,
	toggleSecteurActivite: (secteurActivite: string) => void,
	inputTypeContrat: Array<string>,
	inputTempsDeTravail: Array<string>,
	inputNiveauEtude: Array<string>,
	inputSecteurActivite: Array<string>,
	onClick: () => void
}) {
	return (
		<ModalComponent
			close={props.close}
			closeTitle="Fermer les filtres"
			isOpen={props.open}
			aria-labelledby="dialog_label"
		>
			<ModalComponent.Title>
				<Icon name="menu"/>
				<span id="dialog_label">Filtrer ma recherche</span>
			</ModalComponent.Title>
			<ModalComponent.Content>
				<FilterAccordion title="Type de contrat" open>
					{typesContratEures.map((typeContrat) => (
						<Checkbox
							key={uuidv4()}
							label={typeContrat.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleTypeContrat(e.target.value)}
							value={typeContrat.valeur}
							// NOTE (DORO - 05-12-2023): Pourrait ne plus marcher si on ajoute des types de contrat (cas avec 2 chiffres)
							checked={props.inputTypeContrat.includes(typeContrat.valeur)}
						/>
					))}
				</FilterAccordion>
				<FilterAccordion title="Temps de travail">
					{tempsDeTravailEures.map((tempsDeTravail) => (
						<Checkbox
							key={uuidv4()}
							label={tempsDeTravail.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleTempsDeTravail(e.target.value)}
							value={tempsDeTravail.valeur}
							checked={props.inputTempsDeTravail.includes(tempsDeTravail.valeur)}
						/>
					))}
				</FilterAccordion>
				<FilterAccordion title="Niveau d‘études demandé">
					{niveauEtudesEures.map((niveauEtude) => (
						<Checkbox
							key={uuidv4()}
							label={niveauEtude.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleNiveauEtude(e.target.value)}
							value={niveauEtude.valeur}
							checked={props.inputNiveauEtude.includes(niveauEtude.valeur)}
						/>
					))}
				</FilterAccordion>
				<FilterAccordion title="Domaines">
					{secteurActiviteEures.map((secteurActivite) => (
						<Checkbox
							key={uuidv4()}
							label={secteurActivite.libellé}
							onChange={(e: ChangeEvent<HTMLInputElement>) => props.toggleSecteurActivite(e.target.value)}
							value={secteurActivite.valeur}
							checked={props.inputSecteurActivite.includes(secteurActivite.valeur)}
						/>
					))}
				</FilterAccordion>
			</ModalComponent.Content>
			<ModalComponent.Footer>
				<div className={styles.buttonRechercher}>
					<ButtonComponent
						icon={<Icon name="angle-right"/>}
						iconPosition="right"
						label="Appliquer les filtres"
						onClick={props.onClick}
					/>
				</div>
			</ModalComponent.Footer>
		</ModalComponent>
	);
}
