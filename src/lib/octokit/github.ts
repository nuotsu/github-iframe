// src/lib/octokit/github.ts
export async function fetchGithubFileContent(
  owner: string,
  repo: string,
  path: string,
  token?: string,
): Promise<string> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`; // Fallback for public repos
  const baseHeaders: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  // Try API without token first (for public repos)
  console.log(`Fetching ${apiUrl} without token...`);
  let response = await fetch(apiUrl, { headers: baseHeaders });
  console.log(`API Response status: ${response.status}, OK: ${response.ok}`);

  // If rate limit (429) or auth error (401/403), try with token if provided
  if ((response.status === 429 || response.status === 401 || response.status === 403) && token) {
    const authHeaders: HeadersInit = {
      ...baseHeaders,
      'Authorization': `token ${token}`,
    };
    console.log(`Retrying ${apiUrl} with token due to ${response.status}...`);
    response = await fetch(apiUrl, { headers: authHeaders });
    console.log(`Retry status: ${response.status}, OK: ${response.ok}`);
  }

  if (!response.ok) {
    if (response.status === 429 || response.status === 403) {
      // Fallback to raw URL for public repos when rate limited
      console.log(`Rate limit hit, trying raw URL: ${rawUrl}`);
      const rawResponse = await fetch(rawUrl);
      if (rawResponse.ok) {
        return await rawResponse.text();
      }
      console.error(`Raw fetch failed: ${rawResponse.status} - ${await rawResponse.text()}`);
    }
    const errorText = await response.text();
    console.error(`Failed to fetch ${owner}/${repo}/${path}: ${response.status} - ${errorText}`);
    throw new Error(
      response.status === 429
        ? 'API rate limit exceeded. Try using a personal access token for higher limits.'
        : `Failed to fetch ${owner}/${repo}/${path}: ${response.status} - ${errorText}`
    );
  }

  const data = await response.json();
  if (!data.content || typeof data.content !== 'string') {
    console.error('No valid content in response:', data);
    throw new Error('No valid content found in response');
  }

  return atob(data.content);
}