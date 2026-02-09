/**
 * Commitlint: enforce Conventional Commits.
 * Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert,
 *        hotfix, dep, infra, security, ui, ops.
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'perf',
        'ci',
        'build',
        'revert',
        'hotfix',
        'dep',
        'infra',
        'security',
        'ui',
        'ops',
      ],
    ],
    'header-max-length': [2, 'always', 100],
  },
};
