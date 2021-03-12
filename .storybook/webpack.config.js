const path = require("path");
module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")]
          }
        }, 
        // react-docgen-typescript-loader
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: (prop) => {
              if (prop.parent) {
                return !prop.parent.fileName.includes('node_modules')
              }
              return true            
            }
          }
        }
      ]
    },
    // {
    //   test: /\.scss$/,
    //   loaders: ["style-loader", "css-loader", "sass-loader"],
    //   include: path.resolve(__dirname, "../")
    // }
  );

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};