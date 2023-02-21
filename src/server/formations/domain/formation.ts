export interface Formation {
	titre: string
	nomEntreprise?: string
	tags: [ localisation: string | undefined, niveauRequis: NiveauRequis | 'Autre' ]
}

export enum NiveauRequis {
	NIVEAU_3 = 'CAP, autres formations niveau 3',
	NIVEAU_4 = 'Bac, autres formations niveau 4',
	NIVEAU_5 = 'BTS, DEUST, autres formations niveau 5 (Bac + 2)',
	NIVEAU_6 = 'Licence, BUT, autres formations niveau 6 (Bac + 3)',
	NIVEAU_7_8 = 'Master, titre ingénieur, autres formations niveau 7 ou 8',
}

export interface FormationFiltre {
	codeRomes: Array<string>
}
