// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  // Titre de votre site. Sera utilisé dans les métadonnées et comme titre dans l'onglet du navigateur.
  title: 'Documentation Technique 1jeune1solution',
  customFields: {
    shortTitle: '1jeune1solution',
  },

  // Le slogan de votre site web.
  tagline: 'Le code source de 1jeune1solution est ouvert pour que chacun puisse contribuer à l\'avenir des jeunes !',

  // Le chemin d'accès au favicon de votre site, il doit s'agir d'une URL qui peut être utilisée dans le href du lien.
  favicon: 'img/favicon.ico',

  // URL de votre site web. Cela peut également être considéré comme le nom d'hôte de premier niveau.
  url: 'https://dnum-socialgouv.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '1j1s-front/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'DNUM-SocialGouv', // Usually your GitHub org/user name.
  projectName: '1j1s-front', // Usually your repo name.

  // Cette option ajoute <meta name="robots" content="noindex, nofollow"> à chaque page,
  // pour dire aux moteurs de recherche de ne pas indexer votre site 
  noIndex: true, 

  // Le comportement de Docusaurus lorsqu'il détecte un lien défectueux.
  onBrokenLinks: 'throw',

  // Le comportement de Docusaurus lorsqu'il détecte un lien défectueux du Markdown.
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/DNUM-SocialGouv/1j1s-front/tree/main/docs/docs/',

          lastVersion: 'current',
          versions: {
            current: {
              label: `Future version 🚧`,
            },
          },
        },
        pages: {
          path: 'pages',
          mdxPageComponent: '@theme/MDXPage',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Documentation technique 1jeune1solution',
        logo: {
          alt: '#1jeune1solution',
          src: '/img/mariane.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'architecture/architecture',
            position: 'left',
            label: 'Front',
          },
          {
            position: 'left',
            label: 'ETL',
            href: 'https://dnum-socialgouv.github.io/1j1s-etl/docs/architecture',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/DNUM-SocialGouv/1j1s-front',
            label: 'Code source',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Composants techniques',
            items: [
              {
                label: 'Front (sur Github)',
                href: 'https://github.com/DNUM-SocialGouv/1j1s-front',
              },
              {
                label: 'CMS (sur Github)',
                href: 'https://github.com/DNUM-SocialGouv/1j1s-main-cms',
              },
              {
                label: 'ETL (sur Github)',
                href: 'https://github.com/DNUM-SocialGouv/1j1s-etl',
              },
            ],
          },
          {
            title: 'Outils',
            items: [
              {
                label: 'Figma',
                href: 'https://www.figma.com/file/AYdRLod5b9ZMKVoBU2hczj/Prototypes_1jeune1solution?node-id=4%3A2&t=62l0sMZ6lFPWxcxS-0',
              },
              {
                label: 'JIRA',
                href: 'https://jira-mcas.atlassian.net/browse/UNJ1S',
              },
            ],
          },
          {
            title: '#1jeune1solution',
            items: [
              {
                html: 'Une initiative du Gouvernement pour accompagner, former, et faciliter l’entrée dans la vie professionnelle de tous les jeunes de 15 à 30 ans, sur tous les territoires.'
              }
            ],
          },
        ],
        copyright: `Sauf mention contraire, tous les contenus de ce site sont sous licence <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md">etalab-2.0</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
