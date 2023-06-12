export class InvalidActionError extends Error {
	constructor(action: string) {
		super(`Invalid action "${action}"`);
	}
}
