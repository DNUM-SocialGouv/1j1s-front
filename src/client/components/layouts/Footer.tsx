import {
  Footer as FooterDSFR,
  FooterBody,
  FooterBodyItem,
  FooterBottom,
  FooterCopy,
  FooterLink,
  FooterOperator,
  FooterPartners,
  FooterPartnersLogo,
  FooterPartnersTitle,
  Logo,
} from '@dataesr/react-dsfr';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <FooterDSFR>
      <FooterBody
        description="Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 13 à 30 ans, sur tous les territoires."
      >
        <Logo asLink={<></>}>Ministère du travail, de l&apos;emploi et de l&apos;insertion</Logo>
        <FooterOperator>
          <Image
            src="/images/logos/france-relance.svg"
            alt="France Relance"
            width="200"
            height="66"
          />
        </FooterOperator>
        <FooterBodyItem>
          <Link href="https://gouvernement.fr">
            <a>gouvernement.fr</a>
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href="https://travail-emploi.gouv.fr">
            <a>travail-emploi.gouv.fr</a>
          </Link>
        </FooterBodyItem>
        <FooterBodyItem>
          <Link href="https://france.fr">
            <a>france.fr</a>
          </Link>
        </FooterBodyItem>
      </FooterBody>
      <FooterPartners>
        <FooterPartnersTitle as='p'>Nos partenaires</FooterPartnersTitle>
        <FooterPartnersLogo
          href="/"
          imageSrc="/images/logos/france-relance.svg"
          imageAlt="France relance"
        />
      </FooterPartners>
      <FooterBottom>
        <FooterLink asLink={<Link href="/" />}>CGU</FooterLink>
        <FooterLink asLink={<Link href="/" />}>Mentions légales</FooterLink>
        <FooterLink asLink={<Link href="/" />}>Politique de confidentialité</FooterLink>
        <FooterLink asLink={<Link href="/" />}>Accessibilité</FooterLink>
        <FooterCopy>© République Française 2022</FooterCopy>
      </FooterBottom>
    </FooterDSFR>
  );
}
