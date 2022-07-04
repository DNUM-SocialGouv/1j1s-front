import { mapFullLocalisation } from '~/server/engagement/infra/repositories/apiEngagement.mapper';

describe('mapFullLocalisation', () => {
  it('retourner la ville, n° de département, département et région', () => {
    const city = 'Nantes';
    const région = 'Pays de la Loire';
    const départementName = 'Loire-Atlantique';
    const départementCode = '44';
    expect(mapFullLocalisation(city, départementName, départementCode, région)).toEqual('Nantes (44 - Loire-Atlantique - Pays de la Loire)');
  });
  it('retourner la ville, n° de département, département', () => {
    const city = 'Nantes';
    const région = '';
    const départementName = 'Loire-Atlantique';
    const départementCode = '44';
    expect(mapFullLocalisation(city, départementName, départementCode, région)).toEqual('Nantes (44 - Loire-Atlantique)');
  });
  it('retourner la ville, n° de département', () => {
    const city = 'Nantes';
    const région = '';
    const départementName = '';
    const départementCode = '44';
    expect(mapFullLocalisation(city, départementName, départementCode, région)).toEqual('Nantes (44)');
  });
  it('retourner la ville', () => {
    const city = 'Nantes';
    const région = '';
    const départementName = '';
    const départementCode = '';
    expect(mapFullLocalisation(city, départementName, départementCode, région)).toEqual('Nantes');
  });
  it('retourner la ville, n° de département, région si département et villes sont les mêmes', () => {
    const city = 'Paris';
    const région = 'Île de France';
    const départementName = 'Paris';
    const départementCode = '75';
    expect(mapFullLocalisation(city, départementName, départementCode, région)).toEqual('Paris (75 - Île de France)');
  });
  it('retourner la ville, n° de département, département si région et département sont les mêmes', () => {
    const city = 'Fort-de-France';
    const région = 'Martinique';
    const départementName = 'Martinique';
    const départementCode = '972';
    expect(mapFullLocalisation(city, départementName, départementCode, région)).toEqual('Fort-de-France (972 - Martinique)');
  });
});
