'use server'

import { octokit } from './client'
import { notFound } from 'next/navigation'

type Props = {
	owner: string
	repo: string
	path?: string[]
}

export async function getRawContent({ owner, repo, path }: Props) {
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

export async function getStargazers(ownerrepo: string) {
	if (!ownerrepo?.includes('/')) return 0

	const [owner, repo] = ownerrepo.split('/')

	const { data } = await octokit.rest.repos.get({ owner, repo })

	return data.stargazers_count
}
