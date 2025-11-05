import { Octokit } from 'octokit'

// Default Octokit instance for public access or pre-configured token
export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN!,
})

// Function to fetch file content with an optional token for private repos
export async function getFileContent({
  owner,
  repo,
  path,
  token,
}: {
  owner: string
  repo: string
  path: string
  token?: string
}): Promise<string> {
  // Use a new Octokit instance if a token is provided, otherwise use the default
  const authOctokit = token ? new Octokit({ auth: token }) : octokit
  try {
    const { data } = await authOctokit.rest.repos.getContent({
      owner,
      repo,
      path,
      mediaType: { format: 'raw' },
    })
    return String(data)
  } catch (error) {
    console.error('Error fetching file content:', error)
    throw error
  }
}