const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  future: {
    webpack5: true,
  },
  reactStrictMode: true,
  rewrites: async () => {
    return IS_PRODUCTION
      ? []
      : [
          { source: "/api/graphql", destination: "http://localhost:4000" },
          { source: "/api/multiplayer", destination: "http://localhost:8000" },
        ];
  },
};
