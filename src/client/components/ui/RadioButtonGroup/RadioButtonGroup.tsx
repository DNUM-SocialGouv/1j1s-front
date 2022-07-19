import React from 'react';

import styles from '~/client/components/ui/RadioButtonGroup/RadioButtonGroup.module.scss';

export function RadioButtonGroup({ children }: React.PropsWithChildren){
  return(
    <div className={styles.radioButtonGroup}>
      {children}
    </div>
  );
}
