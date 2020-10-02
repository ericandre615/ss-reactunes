const path = require('path');

module.exports = {
  "extends": ["airbnb", "airbnb/hooks"],
  "rules": {
    "react/jsx-uses-react": "error",
    "react/react-in-jsx-scope": ["warn"],
    "react/jsx-filename-extension": [0],
    "react/jsx-props-no-spreading": [0],
    "react/jsx-curly-spacing": [2, {"when": "always", "spacing": {
      "objectLiterals": "never"
    }}],
    "react/prop-types": [0],
    "arrow-parens": [0],
    "no-underscore-dangle": [0],
    "max-len": [1, 120, 2, { "ignoreComments": true }],
    "import/no-named-as-default": [0],
    "import/prefer-default-export": [0],
  },
  "env": {
    "browser": true,
    "jest": true
  },
  "settings": {
    "import/resolver": {
      "alias": {
        "map": [
          ["@state", path.resolve(__dirname, "src/state")],
          ["@components", path.resolve(__dirname, "src/components")],
          ["@views", path.resolve(__dirname, "src/views")],
          ["@config", path.resolve(__dirname, "src/config")],
          ["@utils", path.resolve(__dirname, "src/utils")],
        ]
      }
    }
  }
};

