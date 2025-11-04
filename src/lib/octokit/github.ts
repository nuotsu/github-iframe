// src/lib/octokit/github.ts

// Get the default branch for a repository
async function getDefaultBranch(
  owner: string,
  repo: string,
  token?: string,
): Promise<string> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const baseHeaders: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  let headers = baseHeaders;
  if (token) {
    headers = {
      ...baseHeaders,
      'Authorization': `Bearer ${token}`,
    };
  }

  const response = await fetch(apiUrl, { headers });
  if (!response.ok) {
    // Fallback to 'main' if we can't fetch repo info
    return 'main';
  }

  const data = await response.json();
  return data.default_branch || 'main';
}

export async function fetchGithubFileContent(
  owner: string,
  repo: string,
  path: string,
  token?: string,
  ref?: string,
): Promise<string> {
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
  }

  // Try fetching with specified ref, or let API default to default branch
  let apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  if (ref) {
    apiUrl += `?ref=${ref}`;
  }

  console.log(`Fetching ${apiUrl}${token ? ' with token' : ' without token'}...`);
  let response = await fetch(apiUrl, { headers });
  console.log(`API Response status: ${response.status}, OK: ${response.ok}`);

  // Get branch for error messages, fallback URLs, and retry logic
  let branch = ref;
  if (!branch) {
    branch = await getDefaultBranch(owner, repo, token);
    // If we got 404 and no ref was specified, try with explicit default branch
    if (response.status === 404 && !ref) {
      console.log(`404 error, retrying with explicit default branch: ${branch}`);
      apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;
      response = await fetch(apiUrl, { headers });
      console.log(`Retry API Response status: ${response.status}, OK: ${response.ok}`);
    }
  }
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

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
    } else if (response.status === 404) {
      errorMessage = `File not found: ${path}\n\nThis could mean:\n- The file path is incorrect\n- The file doesn't exist in the default branch (${branch})\n- The repository doesn't exist or you don't have access`;
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

// Export function to get default branch for use in other components
export async function getDefaultBranchForRepo(
  owner: string,
  repo: string,
  token?: string,
): Promise<string> {
  return getDefaultBranch(owner, repo, token);
}