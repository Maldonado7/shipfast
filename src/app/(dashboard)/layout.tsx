import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/lib/auth/supabase-actions'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Get user profile for avatar
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-xl font-semibold">
              Dashboard
            </Link>
            <nav className="flex items-center space-x-4">
              <Link 
                href="/dashboard/todos" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Todos
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/profile"
              className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
              </div>
              <span>
                {profile?.full_name || user.email}
              </span>
            </Link>
            <form action={logout}>
              <Button variant="outline" size="sm" type="submit">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="container py-8">{children}</main>
    </div>
  )
}