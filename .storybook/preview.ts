import type { Preview } from "@storybook/react";

import "@styles/main.scss"

const preview: Preview = {
  parameters: {
    // FIXME (GAFI 08-08-2023): addon-actions semble causer pas mal d'erreurs dans la console et dans la gestion des handlers
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    }
  },
};

export default preview;
