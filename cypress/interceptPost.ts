/// <reference types="cypress" />

export type InterceptParameters = {
    path?: string,
    alias: string,
    actionBeforeWaitTheCall?: () => void,
    query?: { [key: string]: string},
    response?: string,
    responseBodyToCheck: { [key: string]: unknown },
}

export function interceptPost(
	{ path, alias, actionBeforeWaitTheCall, query, response, responseBodyToCheck } : InterceptParameters,
) {
	if(query) {
		cy.intercept({ method: 'POST' , path, query }, response).as(alias);
	} else {
		cy.intercept({ method: 'POST' , path }, response).as(alias);
	}
	actionBeforeWaitTheCall && actionBeforeWaitTheCall();
	cy.wait(`@${alias}`);
	cy.get(`@${alias}`).its('request.body').should('deep.equal', responseBodyToCheck);
}
