/**
 * ESLint config aligned with .cursor/rules/Typescript-md.mdc
 * - No any, no @ts-ignore/@ts-nocheck, explicit types, strict TypeScript
 * - Import order and unused-imports
 */
module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {},
    },
  },
  ignorePatterns: [
    'node_modules/',
    'Pods/',
    '*.config.js',
    '.eslintrc.js',
    'babel.config.js',
    'metro.config.js',
    'index.js',
  ],
  rules: {
    // =====================================================
    // ARROW FUNCTIONS ONLY (NO function keyword)
    // =====================================================
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    // --- Typescript-md.mdc §1: NON-NEGOTIABLE (HARD FAIL) ---
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': false,
        'ts-nocheck': false,
        'ts-expect-error': 'allow-with-description',
        minimumDescriptionLength: 10,
      },
    ],
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],

    // --- Typescript-md.mdc §5: FUNCTION TYPING (explicit params & return) ---
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // --- Typescript-md.mdc §6: ASYNC & PROMISE SAFETY ---
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/require-await': 'warn',

    // --- Typescript-md.mdc §9: UNION TYPES OVER ENUMS (no rule in @typescript-eslint v8; prefer union types manually) ---

    // --- Typescript-md.mdc §10: GENERICS (no extends object) ---
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',

    // --- Import order & unused (clean code) ---
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'type',
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'react-native', group: 'external', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-native'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        distinctGroup: false,
      },
    ],
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // --- Relax redundant rules when TypeScript covers them ---
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // use unused-imports/no-unused-vars instead
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Stricter for TS files
        '@typescript-eslint/explicit-function-return-type': [
          'warn',
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
          },
        ],
      },
    },
    {
      files: ['__tests__/**/*.ts', '__tests__/**/*.tsx'],
      rules: {
        // Allow object literal assertions for test mocks (e.g. synthetic events)
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow',
          },
        ],
      },
    },
  ],
};
