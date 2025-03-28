const { defineConfig } = require("@vue/cli-service");

const plugins = [];

if (process.env.NODE_ENV === "production") {
  const { join } = require("path");
}

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Gallery 3d",
    themeColor: "#FFFFFF",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxOptions: {
      exclude: [/index\.html$/],
    },
  },
  configureWebpack(config) {
    config.plugins = [...config.plugins, ...plugins];
  },
});
