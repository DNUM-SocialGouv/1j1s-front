export default class FailedToAllowServiceError extends Error {
	constructor(public readonly serviceName: string) {
		super(`Impossible de trouver le bouton pour accepter les cookies du service ${serviceName}`);
	}
}
