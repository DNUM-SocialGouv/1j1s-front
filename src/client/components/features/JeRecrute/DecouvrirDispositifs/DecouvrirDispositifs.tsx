import styles from '~/client/components/features/JeRecrute/DecouvrirDispositifs/DecouvrirDispositifs.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { LinkAsButton } from '~/client/components/ui/Link/LinkAsButton';


export function DécouvrirDispositifs () {
  return (
    <div>
      <Container className={styles.recruter}>
        <h2>Vous cherchez à recruter ?</h2>
        <p>Dans le cadre du plan 1 jeune, 1 solution, nous vous accompagnons dans la recherche de vos futurs collaborateurs.</p>
        <ul>
          <li>
            <LinkAsButton href="https://deposer-offre.www.1jeune1solution.gouv.fr/#/deposer-offre">Déposer une offre d&apos;emploi ou d&apos;alternance</LinkAsButton>
          </li>
          <li>
            <LinkAsButton disabled href="/">Déposer une offre de stage</LinkAsButton>
          </li>
        </ul>
      </Container>
    </div>
  );
}
