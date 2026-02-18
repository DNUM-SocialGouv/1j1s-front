import { useSyncExternalStore } from 'react';

enum BREAKPOINT {
  SM = '36em',
  MD = '48em',
  LG = '62em',
}

function getScreenSize() {
	if (typeof window === 'undefined') {
		return BREAKPOINT.SM;
	}

	if (window && window.matchMedia(`(min-width: ${BREAKPOINT.LG})`).matches) {
		return BREAKPOINT.LG;
	}
	if (window && window.matchMedia(`(min-width: ${BREAKPOINT.MD})`).matches) {
		return BREAKPOINT.MD;
	}
	return BREAKPOINT.SM;
}

function subscribe(callback: () => void) {
	window.addEventListener('resize', callback);
	return () => window.removeEventListener('resize', callback);
}

export default function useBreakpoint() {
	const screenSize = useSyncExternalStore(subscribe, getScreenSize, () => BREAKPOINT.SM);

	return {
		isLargeScreen: screenSize === BREAKPOINT.LG,
		isMediumScreen: screenSize === BREAKPOINT.MD,
		isSmallScreen: screenSize === BREAKPOINT.SM,
	};
}
