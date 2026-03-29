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

const hiddenRepos = new Set([
  'raunak protfolio',
  'ronny125 coder',
  'ronny125coder',
  'bankagement',
  'tma',
  'dummy website 1',
  'portfolio prototype',
])

export function useGitHubProjects(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const normalizeRepos = (data: GitHubRepo[]) =>
      data
        .filter((repo) => {
          const normalizedName = repo.name.replace(/[-_]+/g, ' ').trim().toLowerCase()
          return !repo.fork && !hiddenRepos.has(normalizedName)
        })
        .sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
        .map((repo) => ({
          ...repo,
          description: repo.description || 'Open the repository on GitHub to explore the full project details.',
        }))

    async function fetchRepos() {
      try {
        const localRes = await fetch(`/api/github-projects?username=${username}`)
        if (!localRes.ok) throw new Error('Internal GitHub proxy error')
        const localData: GitHubRepo[] = await localRes.json()
        setRepos(normalizeRepos(localData))
      } catch (err) {
        try {
          const directRes = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`,
            {
              headers: {
                Accept: 'application/vnd.github+json',
              },
            }
          )

          if (!directRes.ok) throw new Error('GitHub API error')

          const directData: GitHubRepo[] = await directRes.json()
          setRepos(normalizeRepos(directData))
          setError(null)
        } catch (fallbackErr) {
          setError('Could not load projects from GitHub.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  return { repos, loading, error }
}
