/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
} from '@testing-library/react';

import { AnnonceDeLogement } from '~/client/components/features/Logement/Annonce';
import { AnnonceDeLogementIndexee } from '~/pages/annonces/AnnonceDeLogement.type';


const uneAnnonceDeLogement: AnnonceDeLogementIndexee = {
  dateDeDisponibilite: '2023-01-01',
  dateDeMiseAJour: '2022-12-04',
  localisationAAfficher: 'Paris',
  prix: 1200,
  prixHT: 1000,
  slug: 'un-slug-appart-a-louer',
  surfaceAAfficher: 'de 70 à 71m2',
  titre: 'Appartement à louer',
  type: 'appartement',
  url: 'https://www.immo.com',
};

const mockDate = jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('12/4/2022');

describe('Annonce Component', () => {
  afterAll(() => {
    mockDate.mockRestore();
  });

  it('contient une image par défaut', async () => {
    await render(<AnnonceDeLogement hit={uneAnnonceDeLogement}/>);
    const image = screen.getByRole('img');
    expect(image.src).toContain('%2Fimages%2Fdefaut-logement.webp'); // %2F => /
  });

  it('contient le type de logement', async () => {
    await render(<AnnonceDeLogement hit={uneAnnonceDeLogement}/>);
    const appartement = 'appartement';
    const type = screen.getByText(appartement);
    expect(type).toBeInTheDocument();
  });

  it('contient la date de mise à jours', async () => {
    await render(<AnnonceDeLogement hit={uneAnnonceDeLogement}/>);
    const dateDePoste = 'postée le 12/4/2022';
    const date = screen.getByText(dateDePoste);
    expect(date).toBeInTheDocument();
  });

  it('contient le titre de l‘annonce', async () => {
    await render(<AnnonceDeLogement hit={uneAnnonceDeLogement}/>);
    const titre = screen.getByRole('heading', { level: 3 });
    expect(titre).toBeInTheDocument();
  });

  it('contient la surface et le prix', async () => {
    await render(<AnnonceDeLogement hit={uneAnnonceDeLogement}/>);
    const intervalleSurface = 'de 70 à 71m2';
    const surface = screen.getByText(intervalleSurface);
    expect(surface).toBeInTheDocument();

    const loyer = '1200 €';
    const prix = screen.getByText(loyer);
    expect(prix).toBeInTheDocument();
  });

  it('contient la localisation', async () => {
    await render(<AnnonceDeLogement hit={uneAnnonceDeLogement}/>);
    const ville = 'Paris';
    const localisation = screen.getByText(ville);
    expect(localisation).toBeInTheDocument();
  });

  it('contient le lien externe de l‘annonce', async () => {
    await render(<AnnonceDeLogement hit={uneAnnonceDeLogement}/>);
    const urlExterne = 'https://www.immo.com';
    const url = screen.getByRole('link');
    expect(url).toBeInTheDocument();
    expect(url).toHaveAttribute('href', urlExterne);
    expect(url).toHaveAttribute('target', '_blank');
  });
});
