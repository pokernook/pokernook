const withTM = require("next-transpile-modules")(["@pokernook/multiplayer"]);

const IS_PRODUCTION = process.env.NODE_ENV === "production";

module.exports = withTM({
  reactStrictMode: true,
  rewrites: async () => {
    return IS_PRODUCTION
      ? []
      : [
          { source: "/api/graphql", destination: "http://localhost:4000" },
          {
            source: "/api/multiplayer/:path*",
            destination: "http://localhost:8000/:path*",
          },
        ];
  },
});
