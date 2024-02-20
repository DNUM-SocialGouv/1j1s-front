import {
	EtablissementAccompagnement,
	isTypeEtablissement,
	JourSemaine,
	TypeÉtablissement,
} from '~/server/etablissement-accompagnement/domain/etablissementAccompagnement';
import {
	ResultatRechercheEtablissementPublicResponse,
} from '~/server/etablissement-accompagnement/infra/apiEtablissementPublic.response';
import EtablissementPublic = ResultatRechercheEtablissementPublicResponse.EtablissementPublic;
import Adresse = ResultatRechercheEtablissementPublicResponse.Adresse;
import PlageOuverture = ResultatRechercheEtablissementPublicResponse.PlageOuverture;
import PivotLocal = ResultatRechercheEtablissementPublicResponse.Pivot;
import Telephone = ResultatRechercheEtablissementPublicResponse.Telephone;
import Horaire = EtablissementAccompagnement.Horaire;

const JOURS_DE_LA_SEMAINE_NOM = [JourSemaine.LUNDI, JourSemaine.MARDI, JourSemaine.MERCREDI, JourSemaine.JEUDI, JourSemaine.VENDREDI, JourSemaine.SAMEDI, JourSemaine.DIMANCHE];

export function mapEtablissementPublicAccompagnement(resultatRechercheEtablissementPublic: Array<EtablissementPublic>): Array<EtablissementAccompagnement> {
	const etablissementsAccompagnement: Array<EtablissementAccompagnement> = [];
	resultatRechercheEtablissementPublic.map((etablissementPublic) => {
		const { adresse, adresse_courriel, plage_ouverture, id, nom, pivot, telephone } = etablissementPublic;

		const pivotParsed: Array<PivotLocal> = JSON.parse(pivot);
		const typeEtablissement = mapTypeEtablissement(pivotParsed);
		if (!typeEtablissement) return;

		const adressesParsed: Array<Adresse> = JSON.parse(adresse);
		const telephoneParsed: Array<Telephone> | undefined = telephone && JSON.parse(telephone);
		const plageOuvertureParsed: Array<PlageOuverture> = plage_ouverture && JSON.parse(plage_ouverture);

		etablissementsAccompagnement.push({
			adresse: mapAdresse(adressesParsed),
			email: adresse_courriel,
			horaires: plageOuvertureParsed && mapHoraire(plageOuvertureParsed),
			id,
			nom,
			telephone: telephoneParsed && telephoneParsed[0]?.valeur,
			type: typeEtablissement,
		});
	});
	return etablissementsAccompagnement;
}

function mapTypeEtablissement(pivotLocal: Array<PivotLocal>): TypeÉtablissement | undefined {
	let typeEtablissementtypeEtablissement: TypeÉtablissement | undefined;

	pivotLocal.find((pivotLocal) => {
		if (isTypeEtablissement(pivotLocal.type_service_local)) {
			typeEtablissementtypeEtablissement = pivotLocal.type_service_local;
			return true;
		}
		return false;
	});

	return typeEtablissementtypeEtablissement;
}

function mapAdresse(adresseList: Array<Adresse>): string | undefined {
	// TODO (BRUJ 20/02/2024): ce n‘est pas au bff de formater l'adresse
	const adresse = adresseList.find((adresse) => adresse.type_adresse === 'Adresse');
	if (!adresse) {
		return undefined;
	} else {
		return `${adresse.numero_voie}, ${adresse.code_postal} ${adresse.nom_commune}`;
	}
}

function mapHoraire(horaireList: Array<PlageOuverture>): Array<EtablissementAccompagnement.Horaire> {
	const horaires: Array<Horaire> = [];
	const indexJourOuvert: Array<number> = [];
	horaireList.map((plageOuverture) => {
		const indexDebutJour = JOURS_DE_LA_SEMAINE_NOM.indexOf(plageOuverture.nom_jour_debut);
		const indexFinJour = JOURS_DE_LA_SEMAINE_NOM.indexOf(plageOuverture.nom_jour_fin);

		if (indexDebutJour === indexFinJour && indexDebutJour !== -1) {
			horaires.push({ heures: mapHeures(plageOuverture), jour: plageOuverture.nom_jour_debut });
			indexJourOuvert.push(indexDebutJour);
		}

		if (-1 < indexDebutJour && indexDebutJour < indexFinJour) {
			const allIndexJourPlage = generateIndexListBetweenTwoIndex(indexDebutJour, indexFinJour);
			allIndexJourPlage.map((indexJourPlage) => horaires.push({
				heures: mapHeures(plageOuverture),
				jour: JOURS_DE_LA_SEMAINE_NOM[indexJourPlage],
			}));
			indexJourOuvert.push(...allIndexJourPlage);
		}
	});
	horaires.push(...addJoursFermes(indexJourOuvert));
	horaires.sort(sortParJourSemaine);
	return horaires;
}

function sortParJourSemaine(horaireA: Horaire, horaireB: Horaire) {
	if (JOURS_DE_LA_SEMAINE_NOM.indexOf(horaireA.jour) > JOURS_DE_LA_SEMAINE_NOM.indexOf(horaireB.jour)) {
		return 1;
	}
	return -1;
}

function addJoursFermes(indexJourOuvert: Array<number>): Array<EtablissementAccompagnement.Horaire> {
	const horaires: Array<EtablissementAccompagnement.Horaire> = [];
	const indexJoursSemaine = Array.from({ length: 7 }, (_, index) => index);
	indexJoursSemaine.map((indexJour) => {
		!indexJourOuvert.includes(indexJour) && horaires.push({
			heures: [],
			jour: JOURS_DE_LA_SEMAINE_NOM[indexJour],
		});
	});

	return horaires;
}

function mapHeures(plageOuverture: PlageOuverture): Array<EtablissementAccompagnement.Horaire.Heure> {
	const { valeur_heure_debut_1, valeur_heure_debut_2, valeur_heure_fin_1, valeur_heure_fin_2 } = plageOuverture;
	const heures = [];

	if (valeur_heure_debut_1 !== '' && valeur_heure_fin_1 !== '') {
		heures.push({
			début: valeur_heure_debut_1,
			fin: valeur_heure_fin_1,
		});
	}

	if (valeur_heure_debut_2 !== '' && valeur_heure_fin_2 !== '') {
		heures.push({
			début: valeur_heure_debut_2,
			fin: valeur_heure_fin_2,
		});
	}

	return heures;
}

function generateIndexListBetweenTwoIndex(index1: number, index2: number) {
	return Array.from({ length: index2 - index1 + 1 }, (_, index) => index + index1);
}
