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
	label, ...textareaProps
}, ref) {
	const generatedId = useId();
	return (
		<>
			<label htmlFor={generatedId}>{label}</label>
			<textarea id={generatedId} {...textareaProps} ref={ref}/>
		</>
	);
});
