'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { AvatarUpload } from './avatar-upload'
import type { User } from '@supabase/supabase-js'
import type { Database } from '@/lib/supabase/types'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']

const profileSchema = z.object({
  fullName: z.string().max(100).optional(),
  email: z.string().email(),
})

type ProfileFormData = z.infer<typeof profileSchema>

interface ProfileFormProps {
  user: User
  profile: UserProfile | null
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || null)
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const supabase = createClient()
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.full_name || '',
      email: profile?.email || user.email || '',
    },
  })

  const onSubmit = (data: ProfileFormData) => {
    startTransition(async () => {
      try {
        // Update user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            id: user.id,
            email: data.email,
            full_name: data.fullName || null,
            avatar_url: avatarUrl,
          })

        if (profileError) {
          throw profileError
        }

        // Update auth metadata if full name changed
        if (data.fullName !== user.user_metadata?.full_name) {
          const { error: authError } = await supabase.auth.updateUser({
            data: { full_name: data.fullName }
          })

          if (authError) {
            console.warn('Failed to update auth metadata:', authError)
          }
        }

        toast({
          title: 'Success',
          description: 'Profile updated successfully',
        })

      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to update profile',
          variant: 'destructive',
        })
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <AvatarUpload
          userId={user.id}
          currentAvatarUrl={avatarUrl}
          onAvatarChange={setAvatarUrl}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    disabled 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed here. Contact support if needed.
                </p>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  )
}