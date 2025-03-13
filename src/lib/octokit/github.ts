// src/lib/octokit/github.ts
export async function fetchGithubFileContent(
  owner: string,
  repo: string,
  path: string,
  token?: string,
  accountType: 'users' | 'orgs' = 'users'
): Promise<string> {
  const url = accountType === 'users'
    ? `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    : `https://api.github.com/repos/${owner}/${repo}/contents/${path}`; // Same endpoint for orgs, token determines access

  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${owner}/${repo}/${path}: ${response.statusText}`);
  }

  const data = await response.json();
  if (!data.content) {
    throw new Error('No content found in response');
  }

  // Decode base64 content
  return atob(data.content);
}