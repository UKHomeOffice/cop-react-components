module.exports = {
  stories: [
    "../**/*.stories.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        transcludeMarkdown: true,
      }
    },
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/preset-create-react-app"
  ]
}
