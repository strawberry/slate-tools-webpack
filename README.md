# @shopify/slate-tools

This extends [slate-tools v0.14.0](https://github.com/Shopify/slate/tree/0.x) to allow for using Webpack with Slate v0 projects.

You are free to use this package in your own Slate v0 themes, but please note that no support will be offered.

## Usage

### Installation and Setup

* In your project's `package.json`, replace  
`"@shopify/slate-tools": "0.14.0"`  
with  
`"@shopify/slate-tools": "git+https://git@github.com/strawberry/slate-tools-webpack.git"`

* Create a `babel.config.json` file in your theme's root

* Create a `webpack.config.js` file in your theme's root

## Javascript / ES6
To get started with using ES6 in your project, add the following to your `webpack.config.js` file:
```js
const path = require('path');

const outputDir = path.resolve('dist/assets');

module.exports = {
  entry: path.resolve('src/scripts/webpack'),
  output: {
    path: outputDir,
    filename: 'webpack.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      }],
    }],
  },
};
```

The finer configuration in your `babel.config.json` file is up to you, but this is enough to get you started:

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "browsers": "> 0.25%, not dead",
        "corejs": "3"
      }
    ]
  ]
}
```

The default filename for the Webpack compiled file and its associated `dist/assets` file – as defined in your Webpack config – is `webpack.js`, but you can change either of these to whatever you like. 

Put the source in the root of your `src/scripts` directory and start using modern Javascript.

```js
import { ExampleModule } from './modules/Example';

const example = new ExampleModule;
```

## S(C|A)SS
Not supported. Yet. It could be.

## Contributing

When making changes to this package, you must remember to run `npm run prepublish` before committing your changes.
