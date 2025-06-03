import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/features/profile/profile-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-8 text-3xl font-bold">Profile Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProfileForm 
            user={user}
            profile={profile}
          />
        </CardContent>
      </Card>
    </div>
  )
}