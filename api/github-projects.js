export default async function handler(req, res) {
  const username = req.query?.username || 'RoNnY125-coder'
  const token = process.env.GITHUB_TOKEN

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=public`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        message: 'GitHub API error',
      })
    }

    const repos = await response.json()

    return res.status(200).json(repos)
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch GitHub projects',
    })
  }
}
