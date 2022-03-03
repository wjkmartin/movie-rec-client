module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'purecatamphetamine.github.io'],
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
