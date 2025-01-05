import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'plugin:@next/next/recommended',
      'eslint:recommended',
      'prettier',
      'plugin:tailwindcss/recommended',
      'eslint-config-prettier',
      'plugin:prettier/recommended',
      'plugin:import/recommended',
    ],
    rules: {
      'no-unused-vars': 'warn',
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
        },
      ],
      // 'jsx-a11y/rule-name': 'error',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node built-in modules
            'internal',
            'external', // External dependencies (third-party)
            ['parent', 'sibling', 'index'], // Local files (relative imports)
            'object', // Constants, utilities, etc.
            'type', // Type imports (for TypeScript projects)
            'unknown',
          ],
          pathGroups: [
            {
              pattern: 'react', // React imports first
              group: 'internal',
              position: 'before',
            },
            {
              pattern: 'next/**', // Next.js imports after React
              group: 'internal',
              position: 'after',
            },
            {
              pattern: 'lucide-react', // External libraries (third-party)
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/components/**', // Custom components
              group: 'sibling',
              position: 'before',
            },
            {
              pattern: '@/lib/**', // Utility libraries and constants
              group: 'parent',
              position: 'after',
            },
            {
              pattern: '@/api/**', // APIs
              group: 'parent',
              position: 'after',
            },
            {
              pattern: '@/constants/**', // Constants
              group: 'object',
              position: 'after',
            },
            {
              pattern: '**/*.png', // Image imports last
              group: 'unknown',
              position: 'before',
            },
            {
              pattern: '**/*.svg', // SVG images
              group: 'unknown',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default eslintConfig;
