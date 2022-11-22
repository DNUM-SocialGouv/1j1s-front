import NotFound from '~/pages/404';


export default function AnnoncesPage() {
  const displayAnnoncesLogement = process.env.NEXT_PUBLIC_LOGEMENT_FEATURE;

  if (!displayAnnoncesLogement) return <NotFound/>;
  return <h1>Page Annonces Logement en Construction</h1>;
}
