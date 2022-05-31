import { Button, ButtonGroup, Title } from '@dataesr/react-dsfr';

export function PageNotFound(){

  return(
    <>
      <div className="fr-my-14v">
        <div className='fr-mx-4v'>
          <Title as="h1" look="h3">Page non trouvée</Title>
          <p className="fr-text--bold">La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.</p>
          <p className="fr-text--md">Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez consulter notre page d’accueil, ou effectuer une recherche avec notre moteur de recherche en haut de page. Sinon contactez-nous pour que l’on puisse vous rediriger vers la bonne information.</p>
        </div>
        <ButtonGroup
          className="fr-mx-25v fr-mt-4v"
          size="sm"
          isEquisized

          isInlineFrom="sm">
          <Button>
                Retourner à l&apos;accueil
          </Button>
          <Button secondary>
                Contactez-nous
          </Button>
        </ButtonGroup>
      </div>
    </>);
}
