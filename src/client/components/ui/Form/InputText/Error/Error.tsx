import classNames from 'classnames';
import { ComponentPropsWithoutRef } from 'react';

import { useChampContext } from '~/client/components/ui/Form/InputText/ChampContext';

import styles from '../Champ.module.scss';

export function Error({ className, ...rest }: ComponentPropsWithoutRef<'p'>){
	const { errorId } = useChampContext();
	return <p className={classNames(className, styles.error)} id={errorId} {...rest}/>;
}
