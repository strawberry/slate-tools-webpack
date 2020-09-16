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
module.exports = {

  //...

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

## Contributing

When making changes to this package, you must remember to run `npm run prepublish` before committing your changes.
