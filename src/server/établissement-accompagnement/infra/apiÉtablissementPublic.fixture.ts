import {
	ResultatRechercheEtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiEtablissementPublic.response';
import EtablissementPublic = ResultatRechercheEtablissementPublicResponse.EtablissementPublic;
import Pivot = ResultatRechercheEtablissementPublicResponse.Pivot;
import Adresse = ResultatRechercheEtablissementPublicResponse.Adresse;
import Telephone = ResultatRechercheEtablissementPublicResponse.Telephone;
import PlageOuverture = ResultatRechercheEtablissementPublicResponse.PlageOuverture;

export function  anEtablissementPublicResponse(override?: Partial<EtablissementPublic>): EtablissementPublic {
	return {
		adresse: anAdresseEtablissementPublicResponse(),
		adresse_courriel: 'email@missionlocaledeparis.fr',
		id: 'b7c5ef55-664f-4e16-90c3-87518a823b81',
		nom: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 1er 2e 3e 4e 9e 10e et 11e',
		pivot: aPivotEtablissementPublicResponse(),
		plage_ouverture: '[{"nom_jour_debut": "Lundi", "nom_jour_fin": "Jeudi", "valeur_heure_debut_1": "09:00:00", "valeur_heure_fin_1": "11:30:00", "valeur_heure_debut_2": "13:30:00", "valeur_heure_fin_2": "16:30:00"}, {"nom_jour_debut": "Vendredi", "nom_jour_fin": "Vendredi", "valeur_heure_debut_1": "09:00:00", "valeur_heure_fin_1": "11:30:00", "valeur_heure_debut_2": "13:30:00", "valeur_heure_fin_2": "15:30:00"}]',
		telephone: aTelephoneEtablissementPublicResponse(),
		...override,
	};
}


export function aPivotEtablissementPublicResponse(pivots?: Array<Pivot>): string {
	return JSON.stringify(pivots ? pivots : [{ type_service_local: 'marie' }, { type_service_local: 'mission_locale' }]);
}

export function anAdresseEtablissementPublicResponse(adresses?: Array<Adresse>): string {
	return JSON.stringify(adresses ? adresses : [{ code_postal: '13013', nom_commune: 'loin', numero_voie: 'un numero de voie', type_adresse: 'Adresse postale' }, { code_postal: '75011', nom_commune: 'Paris', numero_voie: '29-31 rue des Boulets', type_adresse: 'Adresse' }]);
}

export function aTelephoneEtablissementPublicResponse(telephones?: Array<Telephone>): string {
	return JSON.stringify(telephones ? telephones : [{ valeur: '01 00 00 00 00' }]);
}
export function aPlageOuvertureEtablissementPublicResponse(plagesOuverture?: Array<PlageOuverture>): string {
	return JSON.stringify(plagesOuverture ? plagesOuverture : [{ nom_jour_debut: 'Lundi', nom_jour_fin: 'Jeudi', valeur_heure_debut_1: '09:00:00', valeur_heure_debut_2: '13:30:00', valeur_heure_fin_1: '11:30:00', valeur_heure_fin_2: '16:30:00' }, { nom_jour_debut: 'Vendredi', nom_jour_fin: 'Vendredi', valeur_heure_debut_1: '09:00:00', valeur_heure_debut_2: '13:30:00', valeur_heure_fin_1: '11:30:00', valeur_heure_fin_2: '15:30:00' }]);
}

