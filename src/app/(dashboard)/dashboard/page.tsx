import { getUser } from '@/lib/auth/dal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  const user = await getUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || user?.email}!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Todos</CardTitle>
            <CardDescription>
              Manage your tasks and stay organized
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/todos">View Todos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              View and edit your profile information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your preferences and account settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}