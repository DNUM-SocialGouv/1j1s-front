import React from 'react';

import styles from '~/client/components/features/LesEntreprisesSEngagent/DéchargeRGPD/DéchargeRGPD.module.scss';
import { Link } from '~/client/components/ui/Link/Link';

export function DéchargeRGPD() {
	return (
		<p className={styles.décharge}>
      Vous êtes informé que vos données à caractère personnel sont collectées et traitées par la DGEFP afin de les
      transférer à Pôle Emploi. Pour en savoir plus vous pouvez consulter la <Link href="/confidentialite">politique de
      confidentialité</Link> et les <Link href="/cgu">CGU</Link> de la DGEFP.
		</p>
	);
}
