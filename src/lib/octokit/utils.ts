'use server'

import { octokit } from './client'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'

export async function getRawContent({
	owner,
	repo,
	path,
}: {
	owner: string
	repo: string
	path?: string[]
}) {
	const { data } = await octokit.rest.repos
		.getContent({
			owner,
			repo,
			path: path?.join('/') ?? '',
			mediaType: {
				format: 'raw',
			},
		})
		// TODO: handle errors
		.catch(notFound)

	return String(data)
}

async function getStargazers(ownerrepo: string) {
	if (!ownerrepo?.includes('/')) return 0

	const [owner, repo] = ownerrepo.split('/')

	const { data } = await octokit.rest.repos.get({ owner, repo })

	return data.stargazers_count
}

export const getCachedStargazers = unstable_cache(
	getStargazers,
	['stargazers'],
	{
		revalidate: 3600 * 24, // 1 day
	},
)
