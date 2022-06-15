import {
  useLayoutEffect,
  useState,
} from 'react';

enum BREAKPOINT {
  SM = '36em',
  MD = '48em',
  LG = '62em',
  XL = '78em',
}

function getScreenSize() {
  if (window.matchMedia(`(min-width: ${BREAKPOINT.XL})`).matches) {
    return BREAKPOINT.XL;
  }
  if (window.matchMedia(`(min-width: ${BREAKPOINT.LG})`).matches) {
    return BREAKPOINT.LG;
  }
  if (window.matchMedia(`(min-width: ${BREAKPOINT.MD})`).matches) {
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
    isExtraLargeScreen: screenSize === BREAKPOINT.XL,
    isLargeScreen: screenSize === BREAKPOINT.LG,
    isMediumScreen: screenSize === BREAKPOINT.MD,
    isSmallScreen: screenSize === BREAKPOINT.SM,
  };
}
