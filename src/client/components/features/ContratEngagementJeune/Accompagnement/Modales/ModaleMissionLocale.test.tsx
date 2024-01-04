/**
 * @jest-environment jsdom
 */

import { act, render, screen }from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	ModaleMissionLocale,
} from '~/client/components/features/ContratEngagementJeune/Accompagnement/Modales/ModaleMissionLocale';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aDemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { aCommune } from '~/server/localisations/domain/localisationAvecCoordonnées.fixture';

