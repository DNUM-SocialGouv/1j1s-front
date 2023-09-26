export namespace FAQ {

	export type Slug = string

	export interface Question {
		problématique: string
		slug: FAQ.Slug
	}

	export interface QuestionEtReponse extends Question {
		contenu: string
	}
}


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
