const LBA_CANDIDAT_BASE = process.env.NEXT_PUBLIC_LBA_LANDING_CANDIDAT_URL
	|| 'https://labonnealternance.apprentissage.beta.gouv.fr/1jeune1solution';
const LBA_RECRUTEUR_BASE = process.env.NEXT_PUBLIC_LBA_LANDING_RECRUTEUR_URL
	|| 'https://labonnealternance.apprentissage.beta.gouv.fr/1jeune1solution-recruteurs';

export const LBA_CANDIDAT_URL = `${LBA_CANDIDAT_BASE}?utm_source=1jeune1solution`;
export const LBA_RECRUTEUR_URL = `${LBA_RECRUTEUR_BASE}?utm_source=1jeune1solution`;
