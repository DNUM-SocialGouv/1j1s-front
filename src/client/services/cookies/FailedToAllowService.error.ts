export default class FailedToAllowServiceError extends Error {
	constructor(public readonly serviceName: string, reason: string) {
		super(`Impossible d'accepter les cookies du service ${serviceName} : ${reason}`);
	}
}
