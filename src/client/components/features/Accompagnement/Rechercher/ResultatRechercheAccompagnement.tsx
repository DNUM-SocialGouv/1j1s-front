import { TagList } from '~/client/components/ui/Tag/TagList';

import {
  ÉtablissementAccompagnement,
} from '../../../../../server/établissement-accompagnement/domain/ÉtablissementAccompagnement';
import { CardComponent } from '../../../ui/Card/AbstractCard/CardComponent';
import styles from './ResultatRechercheAccompagnement.module.scss';

interface ResultatRechercheAccompagnementProps {
	etablissementAccompagnement: ÉtablissementAccompagnement
}

export function ResultatRechercheAccompagnement({ etablissementAccompagnement }: ResultatRechercheAccompagnementProps) {
  const { adresse, email, id, nom, telephone } = etablissementAccompagnement;
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
}
