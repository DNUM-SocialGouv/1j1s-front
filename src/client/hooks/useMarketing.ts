import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MarketingService } from '~/client/services/marketing/marketing.service';

export default function useMarketing(pagename: string): void {
	const marketingService = useDependency<MarketingService>('marketingService');

	marketingService.trackPage(pagename);
}
