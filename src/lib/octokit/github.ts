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

  // If token is provided, use it immediately (for private repos)
  // Otherwise, try without token first (for public repos)
  let headers = baseHeaders;
  if (token) {
    headers = {
      ...baseHeaders,
      'Authorization': `Bearer ${token}`,
    };
    console.log(`Fetching ${apiUrl} with token...`);
  } else {
    console.log(`Fetching ${apiUrl} without token...`);
  }

  let response = await fetch(apiUrl, { headers });
  console.log(`API Response status: ${response.status}, OK: ${response.ok}`);

  if (!response.ok) {
    // Only try raw URL fallback for public repos (no token) when rate limited
    // Raw URLs don't work for private repos even with token
    if (!token && (response.status === 429 || response.status === 403)) {
      console.log(`Rate limit or access issue, trying raw URL fallback: ${rawUrl}`);
      const rawResponse = await fetch(rawUrl);
      if (rawResponse.ok) {
        return await rawResponse.text();
      }
      console.error(`Raw fetch failed: ${rawResponse.status} - ${await rawResponse.text()}`);
    }
    
    const errorText = await response.text();
    console.error(`Failed to fetch ${owner}/${repo}/${path}: ${response.status} - ${errorText}`);
    
    let errorMessage: string;
    if (response.status === 401) {
      errorMessage = 'Unauthorized. This repository is private. Please provide a personal access token with repo scope.';
    } else if (response.status === 403) {
      errorMessage = token 
        ? 'Forbidden. Your token may not have access to this repository or the required permissions.'
        : 'Forbidden. This repository may be private or you may have hit rate limits. Try using a personal access token.';
    } else if (response.status === 429) {
      errorMessage = 'API rate limit exceeded. Try using a personal access token for higher limits.';
    } else {
      errorMessage = `Failed to fetch ${owner}/${repo}/${path}: ${response.status} - ${errorText}`;
    }
    
    throw new Error(errorMessage);
  }

  const data = await response.json();
  if (!data.content || typeof data.content !== 'string') {
    console.error('No valid content in response:', data);
    throw new Error('No valid content found in response');
  }

  return atob(data.content);
}