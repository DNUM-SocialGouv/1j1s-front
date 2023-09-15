import { useDependency } from '../context/dependenciesContainer.context';
import { MarketingService } from '../services/marketing/marketing.service';

export default function useMarketing(pagename: string): void {
	const marketingService = useDependency<MarketingService>('marketingService');

	marketingService.trackPage(pagename);
}
