'use client'

import { useState, useEffect } from 'react'
import { store } from '@/lib/store'
import { octokit } from './client'

export default function () {
	const [html_url, setHtmlUrl] = useState('#')

	const { repo: ownerrepo, path } = store()
	const [owner, repo] = ownerrepo.split('/')

	useEffect(() => {
		;(async function () {
			const { data } = await octokit.rest.repos
				.getContent({
					owner,
					repo,
					path,
				})
				.catch(() => ({
					data: { html_url: '#' },
				}))

			setHtmlUrl((data as any)?.html_url)
		})()
	}, [repo, path])

	return html_url
}
