import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD.module.scss';
import { LinkDeprecated } from '~/client/components/ui/LinkDeprecated/LinkDeprecated';

export function DéchargeRGPD() {
	return (
		<p className={styles.décharge}>
      Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP afin de les
      transférer à Pôle Emploi. Pour en savoir plus vous pouvez consulter la <LinkDeprecated href="/confidentialite">politique de
      confidentialité</LinkDeprecated> et les <LinkDeprecated href="/cgu">CGU</LinkDeprecated> de la DGEFP.
		</p>
	);
}
