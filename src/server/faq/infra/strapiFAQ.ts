export interface FAQResponseStrapiQuestionSlug {
	slug: string
}

export interface FAQResponseStrapiQuestion {
	problematique: string
	slug: string
}

export interface FAQResponseStrapiQuestionEtReponse extends FAQResponseStrapiQuestion {
	contenu: string
}
