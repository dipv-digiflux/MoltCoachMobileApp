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
          'object',
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

    // =====================================================
    // RULES FROM code_audit.py & .cursor/rules/*.mdc
    // =====================================================
    'no-restricted-syntax': [
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: 'Use union types instead of enums. (Typescript-md.mdc §9)',
      },
      {
        selector:
          'ClassDeclaration[superClass.name=/^(React\\.)?(Pure)?Component$/]',
        message:
          'Class-based React components are forbidden; use functional components. (Typescript-md.mdc §15)',
      },
      {
        selector: 'CallExpression[callee.name=/^(useDispatch|useSelector)$/]',
        message:
          "NEVER use raw useDispatch/useSelector; use useAppDispatch/useAppSelector from '@/store/hooks'. (store-structure.mdc)",
      },
      {
        selector:
          "ObjectExpression > Property[key.name=/^(padding|margin|gap).*/][value.type='Literal'][value.value!=0]",
        message:
          "Use spacing tokens (e.g. spacing['Spacing-5xl']) not raw numbers. (spacing.mdc)",
      },
      {
        selector:
          "ObjectExpression > Property[key.name=/^(fontSize|lineHeight|fontWeight|fontFamily)$/][value.type='Literal']",
        message:
          'Never use typography properties directly; use typography tokens. (typography.mdc)',
      },
      {
        selector:
          "ObjectExpression > Property[value.type='Literal'][value.value=/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/]",
        message:
          "Hardcoded colors are forbidden; use colors from '@/theme'. (styling-standards.mdc)",
      },
      {
        selector:
          "LogicalExpression[operator='&&'] > JSXElement, LogicalExpression[operator='&&'] > JSXFragment",
        message:
          "Use ternary {condition ? <Comp /> : null} instead of && to avoid rendering '0'. (react-native-architect.mdc §1)",
      },
      {
        selector:
          'TSInterfaceDeclaration > TSInterfaceHeritage > TSExpressionWithTypeArguments:nth-child(2)',
        message:
          'Multi-inheritance via extends is forbidden; use intersection types. (Typescript-md.mdc §3)',
      },
      {
        selector: 'TSTypeAliasDeclaration, TSInterfaceDeclaration',
        message:
          'Move types/interfaces to a .types.ts file or src/types/. (Typescript-md.mdc §15)',
      },
      {
        selector: "CallExpression[callee.name='spacingScale']",
        message:
          'NEVER call spacingScale() in component files; use spacing tokens. (spacing.mdc)',
      },
    ],

    // --- Relax redundant rules when TypeScript covers them ---
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // use unused-imports/no-unused-vars instead

    // --- Disable unsafe rules as requested ---
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
  },
  overrides: [
    {
      files: ['*.hook.ts', 'src/**/*.hooks.ts'],
      excludedFiles: ['src/hooks/**'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'Program',
            message: 'Hook files must be placed in src/hooks/.',
          },
        ],
      },
    },
    {
      files: ['*.types.ts'],
      excludedFiles: ['src/types/**'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'Program',
            message: "'.types.ts' files must be placed in src/types/.",
          },
        ],
      },
    },
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
      files: ['*.tsx'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'Use union types instead of enums. (Typescript-md.mdc §9)',
          },
          {
            selector:
              'ClassDeclaration[superClass.name=/^(React\\.)?(Pure)?Component$/]',
            message:
              'Class-based React components are forbidden; use functional components. (Typescript-md.mdc §15)',
          },
          {
            selector:
              'CallExpression[callee.name=/^(useDispatch|useSelector)$/]',
            message:
              "NEVER use raw useDispatch/useSelector; use useAppDispatch/useAppSelector from '@/store/hooks'. (store-structure.mdc)",
          },
          {
            selector:
              "ObjectExpression > Property[key.name=/^(padding|margin|gap).*/][value.type='Literal'][value.value!=0]",
            message:
              "Use spacing tokens (e.g. spacing['Spacing-5xl']) not raw numbers. (spacing.mdc)",
          },
          {
            selector: 'TSTypeAliasDeclaration, TSInterfaceDeclaration',
            message:
              'Move types/interfaces to a .types.ts file. (component-structure.mdc)',
          },
        ],
      },
    },
    {
      files: ['src/store/slices/**/*.ts'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: "CallExpression[callee.name='createAsyncThunk']",
            message:
              'createAsyncThunk MUST NOT live in slice files; move to store/thunks/. (store-structure.mdc)',
          },
          {
            selector:
              'CallExpression[callee.name=/^(axios|httpGet|httpPost|fetch)$/]',
            message:
              'No API calls allowed inside slice files. (store-structure.mdc)',
          },
        ],
      },
    },
    {
      files: ['src/api/**/*.ts'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector:
              'CallExpression[callee.name=/^(useDispatch|useSelector|dispatch|createSlice)$/]',
            message:
              'API files must NOT import or use Redux/dispatch. (store-structure.mdc)',
          },
        ],
      },
    },
    {
      files: ['src/types/**/*.ts', '**/*.types.ts', 'src/theme/**/*.ts'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'Use union types instead of enums. (Typescript-md.mdc §9)',
          },
          {
            selector: 'TSTypeAliasDeclaration > TSTypeLiteral',
            message:
              "Favor 'interface' over 'type' for object shapes. (react-native-architect.mdc §1)",
          },
        ],
      },
    },
    {
      files: ['src/store/store.ts'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'Use union types instead of enums. (Typescript-md.mdc §9)',
          },
        ],
      },
    },
    {
      files: ['src/store/hooks.ts'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector: 'TSEnumDeclaration',
            message: 'Use union types instead of enums. (Typescript-md.mdc §9)',
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
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
