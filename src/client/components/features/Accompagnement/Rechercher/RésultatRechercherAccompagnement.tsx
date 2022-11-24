import React from 'react';

import { LienSolution } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import { ÉtablissementAccompagnement } from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

import styles from './RésultatRechercherAccompagnement.module.scss';

function formatHeure(heure: string) {
  const split = heure.split(':');
  return `${split[0]}h${split[1] !== '00' ? split[1] : ''}`;
}

function displayHeures(heure: ÉtablissementAccompagnement.Horaire.Heure[]): React.ReactNode {
  if (!heure || heure.length === 0) {
    return (
      <span className={styles.horaireHeure}>Fermé</span>
    );
  }
  if (heure.length > 1) {
    return (
      <span className={styles.horaireHeure}>
        <time dateTime={heure[0].heureDébut}>{formatHeure(heure[0].heureDébut)}</time> - <time dateTime={heure[0].heureFin}>{formatHeure(heure[0].heureFin)}</time> et <time dateTime={heure[1].heureDébut}>{formatHeure(heure[1].heureDébut)}</time> - <time dateTime={heure[1].heureFin}>{formatHeure(heure[1].heureFin)}</time>
      </span>
    );
  } else {
    return (
      <span className={styles.horaireHeure}>
        <time dateTime={heure[0].heureDébut}>{formatHeure(heure[0].heureDébut)}</time> - <time dateTime={heure[0].heureFin}>{formatHeure(heure[0].heureFin)}</time>
      </span>
    );
  }
}

export function RésultatRechercherAccompagnement(props: Omit<LienSolution, 'id'>) {
  const { isLargeScreen } = useBreakpoint();
  const { nomEntreprise, étiquetteOffreList, lienOffre, intituléOffre, logoEntreprise, horaires } = props;

  if (isLargeScreen) {
    return (
      <div data-testid="RésultatRechercherAccompagnement">
        <CardComponent layout={'vertical'} className={styles.card}>
          <CardComponent.Content className={styles.content}>
            <CardComponent.Image className={styles.logo} src={logoEntreprise}/>
            <div className={styles.mainContent}>
              <div className={styles.logoAlignment}>
                <CardComponent.Title className={styles.title} titleAs={'h2'}>
                  {intituléOffre}
                </CardComponent.Title>
                {nomEntreprise && <span className={styles.address}>{nomEntreprise}</span>}
                <TagList list={étiquetteOffreList} className={styles.tags}/>
              </div>
              <a href={lienOffre} className={styles.button}>
                Contacter l‘agence
                <svg className={styles.buttonIcon} width="15" height="20" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0H19C19.5523 0 20 0.447715 20 1V17C20 17.5523 19.5523 18 19 18H1C0.447715 18 0 17.5523 0 17V1C0 0.447715 0.447715 0 1 0ZM18 4.238L10.072 11.338L2 4.216V16H18V4.238ZM2.511 2L10.061 8.662L17.502 2H2.511Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            <details className={styles.details}>
              <summary className={styles.summary}>Voir les horaires d‘ouverture
              </summary>
              <div className={styles.horaireBackground}>
                <ol className={styles.listeHoraire}>
                  {horaires?.map((horaire) => (
                    <li key={horaire.jour} className={styles.horaireElement}>
                      <span className={styles.horaireJour}>{horaire.jour}</span>&nbsp;: {displayHeures(horaire.heures)}
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          </CardComponent.Content>
        </CardComponent>
      </div>
    );
  } else {
	  return (
      <div data-testid="RésultatRechercherAccompagnement">
        <CardComponent layout={'vertical'} className={styles.card}>
          <CardComponent.Content className={styles.content}>
            <CardComponent.Image className={styles.logo} src={logoEntreprise}/>
            <div className={styles.mainContent}>
              <CardComponent.Title className={styles.title} titleAs={'h2'}>
                {intituléOffre}
              </CardComponent.Title>
              {nomEntreprise && <span className={styles.address}>{nomEntreprise}</span>}
            </div>
          </CardComponent.Content>
          <TagList list={étiquetteOffreList} className={styles.tags}/>
          <a href={lienOffre} className={styles.button}>
            Contacter l‘agence
            <svg className={styles.buttonIcon} width="15" height="20" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1 0H19C19.5523 0 20 0.447715 20 1V17C20 17.5523 19.5523 18 19 18H1C0.447715 18 0 17.5523 0 17V1C0 0.447715 0.447715 0 1 0ZM18 4.238L10.072 11.338L2 4.216V16H18V4.238ZM2.511 2L10.061 8.662L17.502 2H2.511Z" fill="currentColor"/>
            </svg>
          </a>
          <details className={styles.details}>
            <summary className={styles.summary}>Voir les horaires d‘ouverture</summary>
            <ol className={styles.listeHoraire}>
              {horaires?.map((horaire) => (
                <li key={horaire.jour} className={styles.horaireElement}>
                  <span className={styles.horaireJour}>{horaire.jour}</span>&nbsp;: {displayHeures(horaire.heures)}
                </li>
              ))}
            </ol>
          </details>
        </CardComponent>
      </div>
    );
  }
}
