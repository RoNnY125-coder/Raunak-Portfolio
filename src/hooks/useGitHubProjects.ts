import { useEffect, useState } from 'react'

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  stargazers_count: number
  language: string | null
  updated_at: string
  fork?: boolean
}

export function useGitHubProjects(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=public`,
          {
            headers: {
              Accept: 'application/vnd.github+json',
            },
          }
        )
        if (!res.ok) throw new Error('GitHub API error')
        const data: GitHubRepo[] = await res.json()

        // Filter out forks, keep real projects even if descriptions are missing.
        const filtered = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)
          .map((repo) => ({
            ...repo,
            description: repo.description || 'Open the repository on GitHub to explore the full project details.',
          }))

        setRepos(filtered)
      } catch (err) {
        setError('Could not load projects from GitHub.')
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  return { repos, loading, error }
}
