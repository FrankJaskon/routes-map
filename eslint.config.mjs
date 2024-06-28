import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/*.js"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        react: fixupPluginRules(react),
        "react-hooks": fixupPluginRules(reactHooks),
        import: fixupPluginRules(_import),
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jest,
        },

        parser: tsParser,
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },

    rules: {
        "prettier/prettier": 2,
        "import/namespace": 0,
        '@typescript-eslint/no-explicit-any': 1,
        "react/jsx-filename-extension": [1, {
            extensions: [".tsx"],
        }],
        "@typescript-eslint/ban-ts-comment": 1,
        "react/function-component-definition": 0,
        "import/prefer-default-export": 0,

        "@typescript-eslint/no-unused-vars": [2, {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/explicit-module-boundary-types": 0,
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1,
    },
}];