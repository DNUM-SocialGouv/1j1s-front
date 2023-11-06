import { Router } from 'instantsearch.js/es/types/router';
import { UiState } from 'instantsearch.js/es/types/ui-state';

export class RoutingService {
	router: Router<UiState> | undefined;

	constructor(router: Router<UiState> | undefined) {
		this.router = router;
	}
}
