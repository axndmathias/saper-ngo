const BASE = "https://api.github.com";

export interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

interface BlobItem {
  path: string;
  content: string;
  encoding: "base64" | "utf-8";
}

async function api<T>(config: GitHubConfig, endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}/repos/${config.owner}/${config.repo}/${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "saper-ngo",
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "unknown error");
    throw new Error(`GitHub API ${res.status}: ${body}`);
  }
  return res.json();
}

async function getLatestCommitSha(config: GitHubConfig): Promise<string> {
  const data = await api<{ object: { sha: string } }>(config, `git/ref/heads/${config.branch}`);
  return data.object.sha;
}

async function createBlobSha(config: GitHubConfig, content: string, encoding: "base64" | "utf-8"): Promise<string> {
  const data = await api<{ sha: string }>(config, "git/blobs", {
    method: "POST",
    body: JSON.stringify({ content, encoding }),
  });
  return data.sha;
}

async function createTree(
  config: GitHubConfig,
  baseTree: string,
  tree: { path: string; mode: string; type: string; sha: string }[]
): Promise<string> {
  const data = await api<{ sha: string }>(config, "git/trees", {
    method: "POST",
    body: JSON.stringify({ base_tree: baseTree, tree }),
  });
  return data.sha;
}

async function createCommit(config: GitHubConfig, message: string, treeSha: string, parentSha: string): Promise<string> {
  const data = await api<{ sha: string }>(config, "git/commits", {
    method: "POST",
    body: JSON.stringify({ message, tree: treeSha, parents: [parentSha] }),
  });
  return data.sha;
}

async function updateRef(config: GitHubConfig, commitSha: string): Promise<void> {
  await api(config, `git/refs/heads/${config.branch}`, {
    method: "PATCH",
    body: JSON.stringify({ sha: commitSha, force: false }),
  });
}

export async function commitFiles(
  config: GitHubConfig,
  files: BlobItem[],
  message: string
): Promise<string> {
  const latestSha = await getLatestCommitSha(config);

  const treeItems = await Promise.all(
    files.map(async (file) => {
      const sha = await createBlobSha(config, file.content, file.encoding);
      return { path: file.path, mode: "100644" as const, type: "blob" as const, sha };
    })
  );

  const treeSha = await createTree(config, latestSha, treeItems);
  const commitSha = await createCommit(config, message, treeSha, latestSha);
  await updateRef(config, commitSha);

  return commitSha;
}

export const GITHUB_CONFIG_KEY = "saper-github-config";

export function loadGitHubConfig(): GitHubConfig | null {
  try {
    const raw = localStorage.getItem(GITHUB_CONFIG_KEY);
    if (!raw) return null;
    const config = JSON.parse(raw) as GitHubConfig;
    if (config.token && config.owner && config.repo) return config;
    return null;
  } catch {
    return null;
  }
}

export function saveGitHubConfig(config: GitHubConfig): void {
  localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(config));
}

export function clearGitHubConfig(): void {
  localStorage.removeItem(GITHUB_CONFIG_KEY);
}
