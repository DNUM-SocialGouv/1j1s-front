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


export namespace FAQResponse {
	export interface FAQ {
		problematique: string
		slug: string
	}

	export interface Réponse extends FAQ {
		contenu: string
	}
}
