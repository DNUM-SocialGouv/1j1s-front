const LBA_CANDIDAT_BASE = process.env.NEXT_PUBLIC_LBA_LANDING_CANDIDAT_URL
	|| 'https://labonnealternance.apprentissage.beta.gouv.fr/1jeune1solution';
const LBA_RECRUTEUR_BASE = process.env.NEXT_PUBLIC_LBA_LANDING_RECRUTEUR_URL
	|| 'https://labonnealternance.apprentissage.beta.gouv.fr/1jeune1solution-recruteurs';

const UTM_COMMON = 'utm_source=1j1s&utm_medium=website';
export const LBA_CANDIDAT_URL = `${LBA_CANDIDAT_BASE}?${UTM_COMMON}&utm_campaign=landinglba1j1s`;
export const LBA_RECRUTEUR_URL = `${LBA_RECRUTEUR_BASE}?${UTM_COMMON}&utm_campaign=recruteurs_landinglba1j1s`;
