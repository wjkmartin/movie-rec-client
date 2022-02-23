module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
}
