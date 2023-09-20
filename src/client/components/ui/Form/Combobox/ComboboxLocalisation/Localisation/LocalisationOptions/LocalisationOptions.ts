export type LocalisationOptions = {
	communeList: Commune[]
	departementList: Departement[]
	regionList: Region[]
}

type Commune = {
	codeInsee: string
	codePostal: string
	nom: string
}

type Departement = {
	code: string
	nom: string
}

type Region = {
	code: string
	nom: string
}
