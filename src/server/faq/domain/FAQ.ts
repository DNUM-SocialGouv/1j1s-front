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


