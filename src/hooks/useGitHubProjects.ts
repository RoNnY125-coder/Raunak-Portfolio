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
}

export function useGitHubProjects(username: string) {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=public`
        )
        if (!res.ok) throw new Error('GitHub API error')
        const data: GitHubRepo[] = await res.json()

        // Filter out forks, sort by stars, take top 6
        const filtered = data
          .filter(r => !r.fork && r.description)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6)

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
