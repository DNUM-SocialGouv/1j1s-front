import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header role="banner" className="fr-header">
        <div className="fr-header__body">
          <div className="fr-container">
            <div className="fr-header__body-row">
              <div className="fr-header__brand fr-enlarge-link">
                <div className="fr-header__brand-top">
                  <div className="fr-header__logo">
                    <p className="fr-logo">
                      Intitulé
                      <br />
                      Officiel
                    </p>
                  </div>
                </div>
                <div className="fr-header__service">
                  <Link href="/">
                    <a title="Accueil - [À MODIFIER | Nom du site / service]">
                      <p className="fr-header__service-title">
                        Nom du site / service
                      </p>
                    </a>
                  </Link>
                  <p className="fr-header__service-tagline">
                    baseline - précisions sur l‘organisation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
