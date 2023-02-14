import classNames from 'classnames';
import React, {
	useCallback,
	useEffect, useId,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Form/InputText/InputText.module.scss';
import { useSynchronizedRef } from '~/client/components/useSynchronizedRef';

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'> & {
	label?: string;
};

export const InputArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({
	label, id: idProps, ...textareaProps
}, ref) {
	const generatedId = useId();
	const id = idProps ?? generatedId;
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<textarea id={id} {...textareaProps} ref={ref}/>
		</>
	);
});
