import type { UserConfig } from '@commitlint/types'

const Configuration: UserConfig = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: 'conventional-changelog-atom',
	formatter: '@commitlint/format',
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
				'perf',
				'test',
				'build',
				'ci',
				'chore',
				'revert'
			]
		],
		'scope-enum': [
			2,
			'always',
			[
				'setup',
				'config',
				'deps',
				'feature',
				'bug',
				'docs',
				'style',
				'refactor',
				'test',
				'build',
				'ci',
				'release',
				'other'
			]
		]
	}
}

export default Configuration
