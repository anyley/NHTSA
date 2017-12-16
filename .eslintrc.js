const path = require('path')


module.exports = {
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, '/webpack.config.dev.babel.js')
      },
      jest: {
        jestConfigFile: './jest.config.js'
      }
    }
  },

  'globals': {
    'ENV': true,
    'COMMIT_TIME': true,
    'BRANCH': true,
    'COMMIT_HASH': true,
    '__dirname': true,
    'process': true,
    'println': true,
    locale: 'en',
    locales: true,
    shallow: true,
    render: true,
    create: true,
    mount: true,
    renderer: true,
    mockReactNode: true,
    store: true,
  },
  'env': {
    browser: true,
    commonjs: true,
    jest: true,
    es6: true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'react',
    'import'
  ],
  'rules': {
    'eqeqeq': 'error',
    'import/no-unresolved': [2, {'commonjs': true, 'amd': true}],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'jsx-quotes': [
      'error',
      'prefer-double'
    ],
    "react/no-render-return-value": 0,
    'react/display-name': 0,
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-spacing': [
      'error',
      'never'
    ],
    'react/jsx-equals-spacing': [
      'error',
      'never'
    ],
    'react/jsx-indent': [
      'error',
      2
    ],
    'react/jsx-indent-props': [0, 2],
    'react/prop-types': 0,
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        'beforeSelfClosing': 'always'
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/self-closing-comp': 'error',
    'indent': [
      'error',
      2,
      {
        'VariableDeclarator': 1,
        'outerIIFEBody': 1,
        'SwitchCase': 1,
        'flatTernaryExpressions': true,
        'ObjectExpression': 1,
        'ignoredNodes': ['MemberExpression', 'CallExpression', 'JSXElement', 'JSXElement *'],
        'FunctionDeclaration': {
          'parameters': 1,
          'body': 1
        },
        'FunctionExpression': {
          'parameters': 1,
          'body': 1
        },
        'CallExpression': {
          'arguments': 1
        },
        'ArrayExpression': 1
      }
    ],
    'newline-per-chained-call': [
      'error',
      {
        'ignoreChainWithDepth': 8
      }
    ],
    'no-whitespace-before-property': 'error',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'object-curly-spacing': [
      2,
      'always'
    ],
    'no-unused-vars': 'off',
    'no-console': 0
  }
}
