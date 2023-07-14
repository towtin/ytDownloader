import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  entry: "./script.js",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new NodePolyfillPlugin()],
};

export default config;
