export type FAQSlug = string

export interface FAQQuestion {
    problématique: string
    slug: FAQSlug
}

export interface FAQQuestionEtReponse extends FAQQuestion {
    contenu: string
}


