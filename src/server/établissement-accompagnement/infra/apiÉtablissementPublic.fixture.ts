import {
	ResultatRechercheEtablissementPublicResponse,
} from '~/server/établissement-accompagnement/infra/apiEtablissementPublic.response';

export function aRésultatRechercheÉtablissementPublicResponse(): ResultatRechercheEtablissementPublicResponse.EtablissementPublic {
	return {
		adresse: '[{"type_adresse": "Adresse", "complement1": "", "complement2": "", "numero_voie": "29-31 rue des Boulets", "service_distribution": "", "code_postal": "75011", "nom_commune": "Paris", "pays": "", "continent": "", "longitude": "2.389022", "latitude": "48.851234", "accessibilite": "ACC", "note_accessibilite": "rampe"}]',
		adresse_courriel: 'email@missionlocaledeparis.fr',
		id: 'b7c5ef55-664f-4e16-90c3-87518a823b81',
		nom: 'Mission locale pour l‘insertion professionnelle et sociale des jeunes (16-25 ans) - Paris - 1er 2e 3e 4e 9e 10e et 11e',
		pivot: '[{"type_service_local": "mission_locale", "code_insee_commune": ["75111"]}]',
		plage_ouverture: '[{"nom_jour_debut": "Lundi", "nom_jour_fin": "Jeudi", "valeur_heure_debut_1": "09:00:00", "valeur_heure_fin_1": "11:30:00", "valeur_heure_debut_2": "13:30:00", "valeur_heure_fin_2": "16:30:00", "commentaire": "Accueil sans rendez-vous uniquement pour l\'inscription du lundi au vendredi de 9h à 11h et les après-midi du lundi au mercredi de 13h30 à 16h30."}, {"nom_jour_debut": "Vendredi", "nom_jour_fin": "Vendredi", "valeur_heure_debut_1": "09:00:00", "valeur_heure_fin_1": "11:30:00", "valeur_heure_debut_2": "13:30:00", "valeur_heure_fin_2": "15:30:00", "commentaire": "Accueil sans rendez-vous uniquement pour l\'inscription de 13h30 à 15h30."}]',
		telephone: '[{"valeur": "01 00 00 00 00", "description": ""}]',
	};
}

