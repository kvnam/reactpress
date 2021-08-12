module.exports = {
  typescript: {
    enableTypeChecking: true,
  },
  babel: {
    plugins: ["babel-plugin-styled-components"],
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@containers": path.resolve(__dirname, "src/containers"),
      "@commons": path.resolve(__dirname, "src/commons"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@store": path.resolve(__dirname, "src/store"),
      "@rptypes": path.resolve(__dirname, "src/types"),
    },
  },
};
