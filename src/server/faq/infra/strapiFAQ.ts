export namespace FAQResponseStrapi {
	export interface QuestionSlug {
		slug: string
	}

	export interface Question {
		problematique: string
		slug: string
	}

	export interface QuestionEtReponse extends Question {
		contenu: string
	}
}
