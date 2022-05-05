import {
  useLayoutEffect,
  useState,
} from 'react';

enum BREAKPOINT {
  SM = '36em',
  MD = '48em',
  LG = '62em',
}

function getScreenSize() {
  if (matchMedia(`(min-width: ${BREAKPOINT.LG})`).matches) {
    return BREAKPOINT.LG;
  }
  if (matchMedia(`(min-width: ${BREAKPOINT.MD})`).matches) {
    return BREAKPOINT.MD;
  }
  return BREAKPOINT.SM;
}

export default function useBreakpoint() {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useLayoutEffect(() => {
    function handleDevice(): void {
      setScreenSize(getScreenSize());
    };

    window.addEventListener('resize', handleDevice);
    return () => window.removeEventListener('resize', handleDevice);
  }, []);

  return {
    isLargeScreen: screenSize === BREAKPOINT.LG,
    isMediumScreen: screenSize === BREAKPOINT.MD,
    isSmallScreen: screenSize === BREAKPOINT.SM,
  };
}
