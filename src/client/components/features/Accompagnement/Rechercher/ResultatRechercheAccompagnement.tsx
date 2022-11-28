import { CardComponent } from '~/client/components/ui/Card/AbstractCard/CardComponent';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useBreakpoint from '~/client/hooks/useBreakpoint';
import {
  ÉtablissementAccompagnement,
} from '~/server/établissement-accompagnement/domain/ÉtablissementAccompagnement';

import styles from './ResultatRechercheAccompagnement.module.scss';

interface ResultatRechercheAccompagnementProps {
	etablissementAccompagnement: ÉtablissementAccompagnement
}

export function ResultatRechercheAccompagnement({ etablissementAccompagnement }: ResultatRechercheAccompagnementProps) {
  const { isLargeScreen } = useBreakpoint();
  const { adresse, email, id, nom, telephone } = etablissementAccompagnement;

  if (isLargeScreen) {
    return (
	    <CardComponent className={styles.card} layout={'horizontal'}>
	      <CardComponent.Image className={styles.image} src={'/images/logos/info-jeunes.svg'} />
	        <CardComponent.Content className={styles.content}>
	          <div>
	            <CardComponent.Title className={styles.title} titleAs={'h2'}>{nom}</CardComponent.Title>
						  {adresse && <div>{adresse}</div>}
	          </div>
	          <TagList list={[telephone, email]} />
	        </CardComponent.Content>
	      <CardComponent.Link appearance={'asPrimaryButton'} href={`mailto:${id}`} label={'Contacter'} />
	    </CardComponent>
    );
  } else {
	  return (
		  <CardComponent className={styles.card} layout={'vertical'}>
			  <div className={styles.header}>
		      <CardComponent.Image className={styles.image} src={'/images/logos/info-jeunes.svg'} />
				  <CardComponent.Title className={styles.title} titleAs={'h2'}>{nom}</CardComponent.Title>
			  </div>
			  <CardComponent.Content className={styles.content}>
				  {adresse && <div className={styles.adresse}>{adresse}</div>}
				  <TagList list={[telephone, email]}/>
			  </CardComponent.Content>
			  <CardComponent.Link className={styles.button} appearance={'asPrimaryButton'} href={`mailto:${id}`} label={'Contacter'}/>
		  </CardComponent>
	  );
  }
}
