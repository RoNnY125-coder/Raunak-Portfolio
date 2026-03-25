import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function Admin() {
  const [session, setSession] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [views, setViews] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    supabase.auth.onAuthStateChange((_e, s) => setSession(s))
  }, [])

  useEffect(() => {
    if (!session) return
    // Fetch contact messages
    supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setMessages(data ?? []))
    // Fetch project views
    supabase.from('project_views').select('*').order('view_count', { ascending: false })
      .then(({ data }) => setViews(data ?? []))
  }, [session])

  const login = async () => {
    await supabase.auth.signInWithPassword({ email, password })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="card-glass w-full max-w-sm space-y-4 p-8">
          <h1 className="font-heading text-2xl font-bold">Admin Login</h1>
          <input className="w-full rounded-lg border bg-secondary/50 p-3 text-sm" type="email"
            placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input className="w-full rounded-lg border bg-secondary/50 p-3 text-sm" type="password"
            placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <button onClick={login}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-heading text-3xl font-bold">Admin Panel</h1>
          <button onClick={logout} className="text-sm text-muted-foreground hover:text-primary">Logout</button>
        </div>

        {/* Project Views */}
        <section className="mb-10">
          <h2 className="mb-4 font-heading text-xl font-semibold">Project Views</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {views.map(v => (
              <div key={v.id} className="card-glass p-4">
                <p className="font-medium capitalize">{v.project_slug.replace(/-/g, ' ')}</p>
                <p className="text-3xl font-bold text-primary">{v.view_count}</p>
                <p className="text-xs text-muted-foreground">views</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Messages */}
        <section>
          <h2 className="mb-4 font-heading text-xl font-semibold">Contact Messages</h2>
          <div className="space-y-4">
            {messages.length === 0 && <p className="text-muted-foreground">No messages yet.</p>}
            {messages.map(msg => (
              <div key={msg.id} className="card-glass p-5">
                <div className="mb-2 flex items-center justify-between">
                  <p className="font-semibold">{msg.name} <span className="font-normal text-muted-foreground">— {msg.email}</span></p>
                  <p className="text-xs text-muted-foreground">{new Date(msg.created_at).toLocaleDateString()}</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{msg.message}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
