import classNames from 'classnames';
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from '~/client/components/ui/Form/InputText/InputText.module.scss';
import { useSynchronizedRef } from '~/client/components/useSynchronizedRef';

type TextAreaProps = React.ComponentPropsWithoutRef<'textarea'>;

export const InputArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea({
	...textareaProps
}, ref) {
	return <textarea {...textareaProps} ref={ref}/>;
});
