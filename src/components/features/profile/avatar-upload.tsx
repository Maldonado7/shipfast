'use client'

import { useState, useTransition } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Upload, User } from 'lucide-react'
import Image from 'next/image'
import { revalidatePath } from 'next/cache'

interface AvatarUploadProps {
  userId: string
  currentAvatarUrl?: string | null
  onAvatarChange?: (url: string) => void
}

export function AvatarUpload({ userId, currentAvatarUrl, onAvatarChange }: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const supabase = createClient()

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'File size must be less than 5MB',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}_${Date.now()}.${fileExt}`

      // Delete old avatar if exists
      if (currentAvatarUrl) {
        const oldFileName = currentAvatarUrl.split('/').pop()
        if (oldFileName) {
          await supabase.storage
            .from('avatars')
            .remove([`${userId}/${oldFileName}`])
        }
      }

      // Upload new avatar
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${userId}/${fileName}`, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) {
        throw error
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(data.path)

      // Update user profile with new avatar URL
      startTransition(async () => {
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({ avatar_url: publicUrl })
          .eq('id', userId)

        if (updateError) {
          throw updateError
        }

        onAvatarChange?.(publicUrl)
        
        toast({
          title: 'Success',
          description: 'Avatar updated successfully',
        })
      })

    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to upload avatar',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const isLoading = uploading || isPending

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {currentAvatarUrl ? (
            <Image
              src={currentAvatarUrl}
              alt="Avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 text-muted-foreground" />
          )}
        </div>
        {isLoading && (
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="avatar-upload">
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            className="cursor-pointer"
            asChild
          >
            <span>
              <Upload className="w-4 h-4 mr-2" />
              Change Avatar
            </span>
          </Button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={isLoading}
            className="hidden"
          />
        </label>
        <p className="text-xs text-muted-foreground text-center">
          JPG, PNG or GIF. Max 5MB.
        </p>
      </div>
    </div>
  )
}