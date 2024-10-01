const react = require('eslint-plugin-react');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = [
  {
    settings: {
      react: {
        createClass: 'createReactClass',
        pragma: 'React',
        fragment: 'Fragment',
        version: 'detect',
        defaultVersion: '',
        flowVersion: '0.53',
      },
      propWrapperFunctions: [
        'forbidExtraProps',
        { property: 'freeze', object: 'Object' },
        { property: 'myFavoriteWrapper' },
        { property: 'forbidExtraProps', exact: true },
      ],
      componentWrapperFunctions: [
        'observer',
        { property: 'styled' },
        { property: 'observer', object: 'Mobx' },
        { property: 'observer', object: '<pragma>' },
      ],
      formComponents: [
        'CustomForm',
        { name: 'SimpleForm', formAttribute: 'endpoint' },
        { name: 'Form', formAttribute: ['registerEndpoint', 'loginEndpoint'] },
      ],
      linkComponents: [
        'Hyperlink',
        { name: 'MyLink', linkAttribute: 'to' },
        { name: 'Link', linkAttribute: ['to', 'href'] },
      ],
    },
  },
  stylistic.configs.customize({
    arrowParens: true,
    semi: true,
  }),
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],

];
