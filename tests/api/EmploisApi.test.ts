import nock from "nock";

import handlerEmplois from "../../src/pages/api/emplois";

describe("/api/emplois", () => {
  it("retourne la liste des emplois disponibles", async () => {
    const successReply = {
      result: 1,
      session: "testsessionId",
      text: "Auth ok",
    };

    nock("https://entreprise.pole-emploi.fr")
      .post(
        "/connexion/oauth2/access_token?realm=partenaire",
        "grant_type=client_credentials&client_id=fake_client_id&client_secret=fake_client_secret&scope=fake_scope"
      )
      .reply(200, {
        access_token: "fake_token",
        expires_in: 1499,
      })
      .isDone();

    nock.restore();

    nock("https://api.emploi-store.fr")
      .get("/partenaire/offresdemploi/v2/offres/search?range=0-49")
      .reply(206, {
        resultats: [
          {
            description:
              "Nous recherchons pour le compte de notre client, leader mondial de la construction, de l'entretien et de la maintenance des infrastructures de transport, une/un ouvrier des enrobés (f/h).\n\nPour cette mission :\n- Vous réalisez des revêtements (bitume, asphalte, émulsion, enrobés).\n- Vous utilisez le râteau sur des grandes et petites surfaces\n- Vous réalisez le terrassement, gravillonnage à l'aide d'outils manuels.\n- Vous pouvez également réaliser la signalisation et balisage de chantier, prévention du risque routier.\n\nLe permis B est souhaité, afin de conduire le véhicule de société pour se rendre sur les lieux d'intervention.\n\nVotre salaire est de 12 € brut de l'heure. Indemnité de panier de chantier de 15 € + Primes de déplacement.\n\nAvantages RANDSTAD :\n-CET 7,5%\n-Acompte de paye à la semaine si besoin\n-Possibilité d'intégration rapide, de formation et d'évolution\n-Bénéficiez d'aides et de services dédiés (mutuelle, logement, garde enfant, déplacement)\n-Avantages CE RANDSTAD SUD EST\n\nVous faites preuve de dynamisme, êtes rigoureux(se) et aimez le travail en équipe ? Vous respectez impérativement les consignes de sécurité ?\n\nN'attendez plus et postulez rapidement en envoyant votre CV.\nNous nous engageons à vous répondre dans les meilleurs des délais.",
            id: "130SQNS",
            intitule: "Ouvrier des enrobés (F/H)",
          },
        ],
      })
      .isDone();

    // await handlerEmplois(req, res);
  });
});
