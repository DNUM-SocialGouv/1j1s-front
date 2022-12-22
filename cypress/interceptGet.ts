/// <reference types="cypress" />

export type InterceptParameters = {
    path?: string,
    alias: string,
    actionBeforeWaitTheCall?: () => void,
    response?: string,
    statusCode?: number
}

export function interceptGet(
  { path, alias, actionBeforeWaitTheCall, response, statusCode } : InterceptParameters,
) {
  if(statusCode) {
    cy.intercept({ method: 'GET' , path }, { body: response, statusCode }).as(alias);
  } else {
    cy.intercept({ method: 'GET' , path }, response).as(alias);
  }
  actionBeforeWaitTheCall && actionBeforeWaitTheCall();
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', statusCode ? statusCode : 200);
}
