import {
  anOffreEmploiResponseCompétenceList,
  anOffreEmploiResponseCompétenceListAvecCompétenceNonDéfinie,
  anOffreEmploiResponseFormationList,
  anOffreEmploiResponseFormationListAvecFormationNonDéfinie,
  anOffreEmploiResponseQualitéeProfessionnelleList,
  anOffreEmploiResponseQualitéeProfessionnelleListAvecQualitéeNonDéfinie,
} from '@tests/fixtures/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.response.fixture';

import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';
import {
  mapCompétence,
  mapFormation,
  mapQualitéeProfessionnelle,
} from '~/server/offresEmploi/infra/repositories/apiPoleEmploiOffre.mapper';


describe('mapper', () => {
  describe('mapCompétence', () => {
    describe('quand la réponse des compétences est undefined', () => {
      it('retourne undefined', () => {
        //given
        const compétenceResponse = undefined;
        //when
        const mappedOffreEmploiCompétenceList = mapCompétence(compétenceResponse);
        const résultatAttendu = undefined;
        //then
        expect(mappedOffreEmploiCompétenceList).toEqual(résultatAttendu);
      });
    });

    describe('quand on récupère une liste de compétences', () => {
      it('retourne les compétences', () => {
        //given
        const compétenceResponse = anOffreEmploiResponseCompétenceList();
        //when
        const mappedOffreEmploiCompétenceList = mapCompétence(compétenceResponse);

        const résultatAttendu: string[] = [
          'Réaliser la prescription médicale',
          'Déterminer les besoins thérapeutiques'];
        //then
        expect(mappedOffreEmploiCompétenceList).toEqual(résultatAttendu);
      });

      it('retourne seulement les libellés qui ne sont pas undefined', () => {
        const compétenceResponse = anOffreEmploiResponseCompétenceListAvecCompétenceNonDéfinie();

        const mappedOffreEmploiCompétenceList = mapCompétence(compétenceResponse);
        const résultatAttendu: string[] = [
          'Réaliser la prescription médicale',
        ];
        expect(mappedOffreEmploiCompétenceList).toEqual(résultatAttendu);
      });
    });
  });

  describe('mapQualitéeProfessionnelle', () => {
    describe('quand la réponse des qualitées professionnelles est undefined', () => {
      it('retourne undefined', () => {
        //given
        const qualitéesProfessionnelleResponse = undefined;
        //when
        const mappedOffreEmploiQualitéeProfessionnelleList = mapQualitéeProfessionnelle(qualitéesProfessionnelleResponse);
        const résultatAttendu = undefined;
        //then
        expect(mappedOffreEmploiQualitéeProfessionnelleList).toEqual(résultatAttendu);
      });
    });

    describe('quand on récupère une liste de qualitées Professionnelles', () => {
      it('retourne les qualitées Professionnelles', () => {
        //given
        const qualitéesProfessionnelleResponse = anOffreEmploiResponseQualitéeProfessionnelleList();
        //when
        const mappedOffreEmploiQualitéeProfessionnelleList = mapQualitéeProfessionnelle(qualitéesProfessionnelleResponse);

        const résultatAttendu: string[] = [
          'Capacité d\'adaptation',
          'Capacité de décision'];
        //then
        expect(mappedOffreEmploiQualitéeProfessionnelleList).toEqual(résultatAttendu);
      });

      it('retourne seulement les libellés qui ne sont pas undefined', () => {
        const qualitéesProfessionnelleResponse = anOffreEmploiResponseQualitéeProfessionnelleListAvecQualitéeNonDéfinie();

        const mappedOffreEmploiQualitéeProfessionnelleList = mapQualitéeProfessionnelle(qualitéesProfessionnelleResponse);
        const résultatAttendu: string[] = [
          'Capacité d\'adaptation',
        ];
        expect(mappedOffreEmploiQualitéeProfessionnelleList).toEqual(résultatAttendu);
      });
    });

    describe('mapFormation', () => {
      describe('quand la réponse des formations est undefined', () => {
        it('retourne undefined', () => {
        //given
          const formationResponse = undefined;
          //when
          const mappedOffreEmploiFormationList = mapFormation(formationResponse);
          const résultatAttendu = undefined;
          //then
          expect(mappedOffreEmploiFormationList).toEqual(résultatAttendu);
        });
      });

      describe('quand on récupère une liste de formations', () => {
        it('retourne les formations', () => {
        //given
          const formationResponse = anOffreEmploiResponseFormationList();
          //when
          const mappedOffreEmploiFormationList = mapFormation(formationResponse);

          const résultatAttendu: OffreEmploi.Formation[] = [
            { commentaire: 'DE docteur en médecine', libellé: 'Bac+5 et plus ou équivalents' },
            { commentaire: 'Licence pro commerce', libellé: 'Bac+3 et plus ou équivalents' },
          ];
          //then
          expect(mappedOffreEmploiFormationList).toEqual(résultatAttendu);
        });

        it('retourne seulement les champs qui ne sont pas undefined', () => {
          const formationResponse = anOffreEmploiResponseFormationListAvecFormationNonDéfinie();

          const mappedOffreEmploiFormationList = mapFormation(formationResponse);
          const résultatAttendu: OffreEmploi.Formation[] = [
            { commentaire: 'DE docteur en médecine', libellé: 'Bac+5 et plus ou équivalents' },
          ];
          expect(mappedOffreEmploiFormationList).toEqual(résultatAttendu);
        });
      });
    });
  });
});











