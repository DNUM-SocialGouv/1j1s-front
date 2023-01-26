import React from 'react';

import SeeMoreItemList, { SeeMoreProps } from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export default function SeeMoreMobileOnly(props: React.PropsWithChildren<SeeMoreProps>) {
	const { children, ...rest } = props;
	const { isSmallScreen, isMediumScreen } = useBreakpoint();

	if (isSmallScreen || isMediumScreen) {
		return (
			<SeeMoreItemList {...rest} />
		);
	} else {
		return <>{children}</>;
	}
}
