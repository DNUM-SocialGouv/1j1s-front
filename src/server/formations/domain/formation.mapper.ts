import { NiveauRequis } from '~/server/formations/domain/formation';

export function mapNiveauFormation(niveauRequis: string | undefined): NiveauRequis | 'Autre' {
	switch (niveauRequis) {
		case '3 (CAP...)':
			return NiveauRequis['NIVEAU_3'];
		case '4 (BAC...)':
			return NiveauRequis['NIVEAU_4'];
		case '5 (BTS, DEUST...)':
			return NiveauRequis['NIVEAU_5'];
		case '6 (Licence, BUT...)':
			return NiveauRequis['NIVEAU_6'];
		case '7 (Master, titre ingénieur...)':
			return NiveauRequis['NIVEAU_7_8'];
		default:
			return 'Autre';
	}
}
