export type QuestionSlug = string

export namespace Question {
	export interface QuestionRéponse extends Question {
		contenu: string
	}
}

export interface Question {
	problématique: string
	slug: QuestionSlug
}
