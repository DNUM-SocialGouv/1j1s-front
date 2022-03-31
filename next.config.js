const nextConfig = {
  publicRuntimeConfig: {
    // Conf will be available on both server and client
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Conf will only be available on the server side

    // a mettre en variable d'env
    client_id:
      "PAR_test_eb72042b043039608997944fe5e741ddba12ddcd4d003e74ba9aff72d785fd19",
    client_secret:
      "78f6558668b2b43488b70f04947860e848e85401738feb152bb2d6025ecf0fb9",
    scope:
      "application_PAR_test_eb72042b043039608997944fe5e741ddba12ddcd4d003e74ba9aff72d785fd19 api_offresdemploiv2 o2dsoffre",
  },
};

module.exports = nextConfig;
