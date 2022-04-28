import { HttpClientService } from '~/client/services/httpClient.service';
import { LoggerService } from '~/client/services/logger.service';
import { OffreEmploiService } from '~/client/services/offreEmploi.service';

describe('OffreEmploiService', () => {
  describe('rechercherOffreEmploi', () => {
    it('appelle emploi avec le filtre', async () => {
      const sessionId = 'ma-session-id';
      const loggerService = new LoggerService(sessionId);
      const httpClientService = new HttpClientService(sessionId, loggerService);
      const offreEmploiService = new OffreEmploiService(httpClientService);
      const filtre = 'opticien';
      const data = { data: [
        {
          'accessibleTH': false,
          'agence': {
            'courriel': 'Pour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/132NBGB',
          },
          'alternance': false,
          'appellationlibelle': 'Ingénieur / Ingénieure d\'études en industrie',
          'competences': [
            {
              'code': '104376',
              'exigence': 'S',
              'libelle': 'Élaborer des solutions techniques et financières',
            },
            {
              'code': '113547',
              'exigence': 'S',
              'libelle': 'Définir la faisabilité et la rentabilité d\'un projet',
            },
            {
              'code': '118500',
              'exigence': 'S',
              'libelle': 'Élaborer des propositions techniques',
            },
            {
              'code': '119161',
              'exigence': 'S',
              'libelle': 'Identifier les contraintes d\'un projet',
            },
            {
              'code': '124529',
              'exigence': 'S',
              'libelle': 'Déterminer des axes d\'évolution technologiques',
            },
          ],
          'contact': {
            'coordonnees1': 'IMMEUBLE GREENWICH 15 RUE THALES',
            'coordonnees2': '33692 MERIGNAC',
            'coordonnees3': 'Pour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/132NBGB',
            'nom': 'Pôle Emploi MERIGNAC',
          },
          'dateActualisation': '2022-04-28T11:44:57.000Z',
          'dateCreation': '2022-04-28T11:34:10.000Z',
          'description': 'CRISE SANITAIRE : L\'employeur garantit une procédure de recrutement conforme aux recommandations gouvernementales.\n\nA compétences égales, le poste est ouvert aux personnes en situation de handicap.\n\nEPSILON est une société du groupe ALCEN qui répond à différents besoins de conception et d\'optimisation de systèmes pour les grands secteurs industriels (énergie, aéronautique, spatial). EPSILON mène des études pour le perfectionnement des produits de ses clients ou pour ses propres technologies et s\'engage sur des projets complexes de conception-réalisation avec le support et la puissance industrielle du groupe ALCEN.\n\nEPSILON a fait le choix de l\'expertise en cultivant certaines spécialités depuis de nombreuses années tout en ayant la performance opérationnelle d\'un groupe industriel et de haute technologie comme ALCEN. Son positionnement à la fois « services » et « produits » est unique dans le domaine de l\'ingénierie et permet à ses ingénieurs d\'exprimer tous leurs talents.\n\nLa société est maintenant organisée en trois centres de compétences :\n\nEPSILON PHYSICS              :      dédié à l\'ingénierie physique,\nEPSILON DIGITAL               :      dédié à l\'informatique,\nEPSILON SYSTEM               :      dédié à la performance opérationnelle.\nPour renforcer son activité dans le domaine de l\'énergie, EPSILON recherche un.e Ingénieur.e optique et systèmes électroniques pour son agence située à Bordeaux.  \n\nPROJET \nEPSILON, société experte en études et réalisation « multi-physique », intervient sur des projets divers impliquant des compétences pluridisciplinaires. Il s\'agit de combiner les principes de l\'optique pour comprendre les échanges thermiques, et mettre en place les bancs associés.\n\nPlus précisément, vous participez au montage de démonstrateurs, de bancs, de prototypes, vous sélectionnez et testez le hardware et procédez à la mise en service.\n\n Nous vous proposons de renforcer notre équipe Bordelaise et contribuer à des projets ambitieux et techniques. Vous allez évoluer au près des experts techniques et serez amené à mener les actions suivantes :\n\n Définition des mesures et des bancs d\'essais\nRédaction de la spécification / matrice d\'exigence\nDesign fonctionnel du banc pour répondre au cahier de charges\nDesign des nouvelles fonctionnalités sur systèmes existants\nSélection et montage du matériel, instruments (optiques, électroniques, etc.)\nRéalisation des campagnes de test\nRédaction de la documentation technique associée\nDéveloppement des systèmes dédiés aux mesures \nRédaction du rapport des résultats et guide d\'utilisation\nEtudes et calculs optique/mécanique/ thermique (en équipe)\nPlanification et mise au point de la campagne de test\nDocumentation technique associées\nSourcing Hardware et Composants\nVeille sur la partie hardware et composant\nMise en place de test pour réviser et valider les performances\nPhase de mise en service (ou remise en service)\nDéfinition du protocole des essais, \nDéfinition de spécifications, contrôle automatique de relais,\nAcquisition des données des capteurs, analyse et traitement des données.\nCréation de la version « cahier de recette » pour la livraison\nTests/Débogage système\nPROFIL ET EXPERIENCE REQUISE :\nVous êtes un(e) Ingénieur (e) en Electronique et/ou Optronique, vous avez acquis une expérience professionnelle de minimum 5 ans sur un poste similaire.\n\nCONNAISSANCES & COMPETENCES REQUISES (LOGICIELS) :\nCAO électrique.\nOLSO/ Zemax,\nBon niveau en anglais technique.',
          'dureeTravailLibelle': '37H30 Horaires normaux',
          'dureeTravailLibelleConverti': 'Temps plein',
          'entreprise': {
            'entrepriseAdaptee': false,
            'nom': 'EPSILON INGENIERIE',
          },
          'experienceExige': 'E',
          'experienceLibelle': '5 ans',
          'id': '132NBGB',
          'intitule': 'Ingénieur Optique et Systèmes électroniques (H/F)',
          'lieuTravail': {
            'codePostal': '33700',
            'commune': '33281',
            'latitude': 44.83337,
            'libelle': '33 - MERIGNAC',
            'longitude': -0.674682,
          },
          'natureContrat': 'Contrat travail',
          'nombrePostes': 1,
          'offresManqueCandidats': false,
          'origineOffre': {
            'origine': '1',
            'urlOrigine': 'https://candidat.pole-emploi.fr/offres/recherche/detail/132NBGB',
          },
          'qualificationCode': '9',
          'qualificationLibelle': 'Cadre',
          'qualitesProfessionnelles': [
            {
              'description': 'Capacité à prendre en charge son activité sans devoir être encadré de façon continue. Exemple : travailler efficacement sans responsable',
              'libelle': 'Autonomie',
            },
            {
              'description': 'Capacité à respecter les règles et codes de l\'entreprise, à réaliser des tâches en suivant avec précision les procédures et instructions fournies , à transmettre des informations avec exactitude. Exemple : être ponctuel, respecter les engagements, résister à la distraction',
              'libelle': 'Rigueur',
            },
            {
              'description': 'Capacité à réagir rapidement face à des évènements et à des imprévus, en hiérarchisant les actions, en fonction de leur degré d\'urgence / d\'importance. Exemple : faire preuve de dynamisme, vivacité, énergie, comprendre vite',
              'libelle': 'Réactivité',
            },
          ],
          'romeCode': 'H1206',
          'romeLibelle': 'Management et ingénierie études, recherche et développement industriel',
          'salaire': {
            'commentaire': 'à négocier',
            'complement1': 'Autre',
          },
          'secteurActivite': '74',
          'secteurActiviteLibelle': 'Activités spécialisées, scientifiques et techniques diverses',
          'typeContrat': 'CDI',
          'typeContratLibelle': 'Contrat à durée indéterminée',
        },
        {
          'accessibleTH': false,
          'alternance': false,
          'appellationlibelle': 'Technicien / Technicienne de fabrication et de méthodes',
          'competences': [
            {
              'code': '100007',
              'exigence': 'S',
              'libelle': 'Techniques de soudage',
            },
            {
              'code': '100038',
              'exigence': 'S',
              'libelle': 'Chiffrage/calcul de coût',
            },
            {
              'code': '120260',
              'exigence': 'S',
              'libelle': 'Analyser les éléments de fabrication',
            },
            {
              'code': '120261',
              'exigence': 'S',
              'libelle': 'Définir les procédés, moyens et modes opératoires',
            },
          ],
          'contact': {
            'coordonnees1': 'Pour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/132MXWC',
            'courriel': 'Pour postuler, utiliser le lien suivant : https://candidat.pole-emploi.fr/offres/recherche/detail/132MXWC',
            'nom': 'HOUMAULT.COM - M. PATRICE HOUMAULT',
          },
          'dateActualisation': '2022-04-28T11:06:05.000Z',
          'dateCreation': '2022-04-28T11:06:04.000Z',
          'description': 'Votre fonction\n\nEn rejoignant l\'équipe fabrication de cette PME, vos principales missions seront de : \n-\tfabriquer sur mesure des composants photoniques\n-\tvous former à l\'ensemble des opérations sur un outil de production moderne\n-\tréaliser de manière autonome : découpe, mise en forme, polissage, contrôles\n\nVotre profil\n\nDe formation technicien en optique ou photonique (Bac+2/3), vous avez une affinité naturelle pour des tâches requérant rigueur, soin et minutie \n\nVous présentez les qualités suivantes :\n-\tConnaissances techniques solides en optique et photonique\n-\tPragmatique et minutieux\n\nCe poste est à pourvoir rapidement en CDI, il est basé en Lorraine (54).\n',
          'dureeTravailLibelle': '35H Horaires normaux',
          'dureeTravailLibelleConverti': 'Temps plein',
          'entreprise': {
            'description': 'Les + du poste : Groupe international à dimension humaine, Pluridisciplinarité, Technicité',
            'entrepriseAdaptee': false,
            'nom': 'HOUMAULT.COM',
            'url': 'http://www.houmault.com/fr',
          },
          'experienceExige': 'D',
          'experienceLibelle': 'Débutant accepté',
          'id': '132MXWC',
          'intitule': 'Technicien Fabrication Optique (H/F)',
          'lieuTravail': {
            'libelle': '54 - Meurthe et Moselle',
          },
          'natureContrat': 'Contrat travail',
          'nombrePostes': 1,
          'offresManqueCandidats': false,
          'origineOffre': {
            'origine': '1',
            'urlOrigine': 'https://candidat.pole-emploi.fr/offres/recherche/detail/132MXWC',
          },
          'qualificationCode': '7',
          'qualificationLibelle': 'Technicien',
          'romeCode': 'H1404',
          'romeLibelle': 'Intervention technique en méthodes et industrialisation',
          'salaire': {
            'libelle': 'Annuel de 28000,00 Euros à 32000,00 Euros sur 12 mois',
          },
          'secteurActivite': '70',
          'secteurActiviteLibelle': 'Conseil pour les affaires et autres conseils de gestion',
          'typeContrat': 'CDI',
          'typeContratLibelle': 'Contrat à durée indéterminée',
        },
      ] };

      jest.spyOn(httpClientService, 'get').mockResolvedValue(data);

      const result = await offreEmploiService.rechercherOffreEmploi(filtre);

      expect(result).toEqual(data);
    });
  });
});
