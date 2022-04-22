const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.IMAGE_PROVIDER_DOMAIN],
  }
};

module.exports = nextConfig;
