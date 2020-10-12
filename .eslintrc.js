module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:react/recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": "off"
    },
    "settings": {
    "react": {
        "createClass": "createReactClass",
            "pragma": "React",
            "fragment": "Fragment",
            "version": "detect",
            "flowVersion": "0.53"
    },
    "propWrapperFunctions": [
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
        {"property": "myFavoriteWrapper"}
    ],
        "linkComponents": [
        "Hyperlink",
        {"name": "Link", "linkAttribute": "to"}
    ]
}
};
