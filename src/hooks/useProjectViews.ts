import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useProjectViews(projectSlug: string) {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    async function trackAndFetch() {
      // Upsert: increment count or create row
    if (!supabase) return
      const { data } = await supabase.rpc('increment_project_view', {
        slug: projectSlug,
      })
      if (data) setViews(data)
    }

    trackAndFetch()
  }, [projectSlug])

  return views
}
