'use server'

import { Octokit } from 'octokit'
import { notFound } from 'next/navigation'

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN!,
})

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
