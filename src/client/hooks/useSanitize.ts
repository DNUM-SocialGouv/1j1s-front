import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

export default function useSanitize(dirty: string | undefined, shouldReplaceCarriageReturn: boolean = true) {
	const [sanitized, setSanitized] = useState('');

	useEffect(() => {
		if (dirty) {
			const contentToSanitize = shouldReplaceCarriageReturn ?  replaceCarriageReturn(dirty) : dirty;
			setSanitized(DOMPurify.sanitize(contentToSanitize));
		}
	}, [dirty, shouldReplaceCarriageReturn]);

	return sanitized;
}

function replaceCarriageReturn(initial: string) {
	const carriageReturnRegex = new RegExp('\\n', 'g');
	return initial.trim().replace(carriageReturnRegex, '<br />');
}
