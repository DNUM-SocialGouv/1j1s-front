import React from 'react';

import SeeMore, { SeeMoreProps } from '~/client/components/ui/SeeMore/SeeMore';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export default function SeeMoreMobileOnly(props: React.PropsWithChildren<SeeMoreProps>) {
	const { children, seeLessLabel, seeMoreLabel, ...rest } = props;
	const { isSmallScreen, isMediumScreen } = useBreakpoint();

	if (isSmallScreen || isMediumScreen) {
		return (
			<SeeMore seeLessLabel={seeLessLabel} seeMoreLabel={seeMoreLabel} {...rest}>
				{children}
			</SeeMore>
		);
	} else {
		return <>{children}</>;
	}
}
