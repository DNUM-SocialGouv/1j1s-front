import DOMPurify from 'dompurify';
import { useMemo } from 'react';

<<<<<<< HEAD
export default function useSanitize(dirty: string | undefined | null): string {
	return useMemo(() => {
		if (!dirty) return '';
		if (typeof window === 'undefined') return dirty;
		return DOMPurify.sanitize(dirty);
	}, [dirty]);
=======
export default function useSanitize(dirty: string | undefined | null) {
	return useMemo(() => dirty ? DOMPurify.sanitize(dirty) : '', [dirty]);
>>>>>>> main
}
