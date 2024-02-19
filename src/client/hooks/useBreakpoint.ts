import {
	useEffect,
	useState,
} from 'react';

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

// TODO supprimer la plupart des utilisations pour se reposer sur du CSS + display:none à la place
export default function useBreakpoint() {
	const [screenSize, setScreenSize] = useState(getScreenSize());

	//TODO voir si on repasse en useEffect après avoir tué les utilisations / vérfiier impact du passage en useEffect
	useEffect(() => {
		function handleDevice(): void {
			setScreenSize(getScreenSize());
		}

		setScreenSize(getScreenSize());

		window.addEventListener('resize', handleDevice);
		return () => window.removeEventListener('resize', handleDevice);
	}, []);

	return {
		isLargeScreen: screenSize === BREAKPOINT.LG,
		isMediumScreen: screenSize === BREAKPOINT.MD,
		isSmallScreen: screenSize === BREAKPOINT.SM,
	};
}
