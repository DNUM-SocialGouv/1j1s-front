import classNames from 'classnames';
import Image from 'next/image';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import { Container } from '~/client/components/layouts/Container/Container';
import { HeroWithButtonLink } from '~/client/components/ui/Hero/HeroWithButtonLink';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { HeadTag } from '~/client/components/utils/HeaderTag';

import styles from './aides-logement.module.scss';
import {ButtonComponent} from "~/client/components/ui/Button/ButtonComponent"
import {ArticleCard} from "~/client/components/ui/Card/ArticleCard"

export default function AidesLogement() {
  return (
    <>
      <HeadTag title='Les aides au logement | 1jeune1solution' />
      <HeroWithButtonLink
        titlePrimaryText='Je découvre les aides pour payer mon logement '
        titleSecondaryText='et bien d’autres encore !'
        content='Grâce à notre simulateur, découvrez les aides auxquelles vous avez droit
          pour votre logement mais aussi votre mobilité, vos vacances, votre santé... et bien plus encore !
          Tout cela à portée de clic et en moins de 5 minutes.'
        buttonLabel='Je découvre mes aides'
        buttonHref='/mes-aides'
        imgSrc='/images/aides-au-logement.webp' />
      <div className={classNames(styles.contentWrapper, 'background-white-lilac')}>
        <Container>
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Découvrez vos aides :</h2>
            <PartnerCard
              className={styles.partnerCard}
              description='La CAF signifie Caisse d’Allocation Familiales. Il y en a dans chaque département.
                Son rôle est de verser les aides qui concernent la famille, le logement mais aussi une partie des aides
                destinées à lutter contre la pauvreté, comme le RSA ou la Prime d’activité.'
              logo='/images/logos/caisse-allocations-familiales.svg'
              link='https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/estimervosdroits/lelogement#/preparation'
              linkLabel='Tester mon éligibilité pour les aides au logement de la CAF'
              title='Vous dépendez du régime général ? Demandez vos aides à la CAF !' />
            <PartnerCard
              className={styles.partnerCard}
              description='La MSA signifie Mutualité Sociale Agricole, c’est le régime de protection sociale obligatoire
              pour toute personne du secteur agricole. Son rôle est donc de verser à tous ses adhérents les aides dont
              ils pourraient avoir besoin : maladie, maternité, retraite...mais aussi logement ! '
              logo='/images/logos/mutualite-sociale-agricole.svg'
              link='https://www.msa.fr/lfp/web/msa/logement/offre-msa'
              linkLabel='Découvrir les aides au logement de la MSA'
              title='Vous dépendez du régume agricole ? Demandez vos aides à la MSA !' />
            <div className={styles.additionalInformation}>
              <Icon name='information' />
              <span>Une question ? Je consulte la FAQ</span>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionHeading}>Tout ce qu&apos;il faut savoir :</h2>
            <div className={styles.articleList}>
              <ArticleCard
                imageSrc='/images/articles/documents.svg'
                link='/articles/comment-constituer-un-dossier-locatif'
                titleLabel='Comment constituer un dossier locatif ?' >
                <p className={styles.articleCardDescription}>Constituer son dossier locatif peut sembler compliqué,
                  surtout si c’est la première fois ! Vous vous demandez comment vous y prendre ?
                  Quels documents rassembler ? Suivez le guide !</p>
              </ArticleCard>
              <ArticleCard
                imageSrc='/images/articles/consultative-sales.svg'
                link='/articles/les-garants-a-quoi-ca-sert-et-vers-qui-me-tourner'
                titleLabel='Les garants : à quoi ça sert et vers qui me tourner ?'>
                <p className={styles.articleCardDescription}>Vous préparez votre dossier locatif et vous vous
                  demandez quel est le rôle d’un garant et comment en trouver un ?
                  On vous explique tout pour que vous trouviez une solution adaptée à votre situation.</p>
              </ArticleCard>
              <ArticleCard
                imageSrc='/images/articles/product-quality.svg'
                link='/articles/quelles-sont-les-aides-pour-financer-un-logement'
                titleLabel='Quelles sont les aides pour payer un logement ?' >
                <p className={styles.articleCardDescription}>Il existe plusieurs dispositifs pour vous aider à
                  financer votre loyer tous les mois et vous soutenir au moment de votre installation.
                  Comment savoir à quelles aides vous pouvez accéder ? On vous dit tout !</p>
              </ArticleCard>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
}
