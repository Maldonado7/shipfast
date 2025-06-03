'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Database, Mail, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface SetupStep {
  id: string
  title: string
  description: string
  icon: React.ElementType
  status: 'pending' | 'in-progress' | 'completed' | 'error'
}

export default function SetupWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [setupSteps, setSetupSteps] = useState<SetupStep[]>([
    {
      id: 'env',
      title: 'Environment Variables',
      description: 'Configure your environment variables',
      icon: Shield,
      status: 'in-progress',
    },
    {
      id: 'database',
      title: 'Database Connection',
      description: 'Test your database connection',
      icon: Database,
      status: 'pending',
    },
    {
      id: 'email',
      title: 'Email Configuration',
      description: 'Set up email sending capabilities',
      icon: Mail,
      status: 'pending',
    },
    {
      id: 'features',
      title: 'Enable Features',
      description: 'Choose which features to enable',
      icon: Zap,
      status: 'pending',
    },
  ])

  const [envVars, setEnvVars] = useState({
    NEXT_PUBLIC_SUPABASE_URL: '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
    DATABASE_URL: '',
    EMAIL_FROM: '',
    RESEND_API_KEY: '',
  })

  const [features, setFeatures] = useState({
    payments: false,
    analytics: false,
    chat: false,
  })

  const updateStepStatus = (stepId: string, status: SetupStep['status']) => {
    setSetupSteps((steps) =>
      steps.map((step) =>
        step.id === stepId ? { ...step, status } : step
      )
    )
  }

  const testDatabaseConnection = async () => {
    updateStepStatus('database', 'in-progress')
    try {
      const response = await fetch('/api/health')
      if (response.ok) {
        updateStepStatus('database', 'completed')
        return true
      }
      throw new Error('Database connection failed')
    } catch (error) {
      updateStepStatus('database', 'error')
      return false
    }
  }

  const testEmailConfiguration = async () => {
    updateStepStatus('email', 'in-progress')
    // Simulate email test
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateStepStatus('email', 'completed')
    return true
  }

  const completeSetup = async () => {
    // Save configuration
    localStorage.setItem('setupCompleted', 'true')
    router.push('/dashboard')
  }

  return (
    <div className="container mx-auto max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Welcome to ShipFast</h1>
        <p className="mt-2 text-muted-foreground">
          Let's get your application set up in just a few steps
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {setupSteps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  step.status === 'completed'
                    ? 'border-green-500 bg-green-500 text-white'
                    : step.status === 'in-progress'
                    ? 'border-primary bg-primary text-primary-foreground'
                    : step.status === 'error'
                    ? 'border-destructive bg-destructive text-destructive-foreground'
                    : 'border-muted bg-muted'
                }`}
              >
                {step.status === 'completed' ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              {index < setupSteps.length - 1 && (
                <div
                  className={`h-1 flex-1 ${
                    setupSteps[index + 1].status !== 'pending'
                      ? 'bg-primary'
                      : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          {setupSteps.map((step) => (
            <div key={step.id} className="flex-1 text-center">
              <p className="text-sm font-medium">{step.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Content */}
      <Card>
        <CardHeader>
          <CardTitle>{setupSteps[currentStep].title}</CardTitle>
          <CardDescription>
            {setupSteps[currentStep].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={setupSteps[currentStep].id}>
            <TabsContent value="env" className="space-y-4">
              <Alert>
                <AlertDescription>
                  Create a <code>.env.local</code> file in your project root with these values
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="supabase-url">Supabase URL</Label>
                  <Input
                    id="supabase-url"
                    value={envVars.NEXT_PUBLIC_SUPABASE_URL}
                    onChange={(e) =>
                      setEnvVars({ ...envVars, NEXT_PUBLIC_SUPABASE_URL: e.target.value })
                    }
                    placeholder="https://your-project.supabase.co"
                  />
                </div>
                <div>
                  <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                  <Input
                    id="supabase-key"
                    value={envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY}
                    onChange={(e) =>
                      setEnvVars({ ...envVars, NEXT_PUBLIC_SUPABASE_ANON_KEY: e.target.value })
                    }
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  />
                </div>
                <div>
                  <Label htmlFor="database-url">Database URL (Optional)</Label>
                  <Input
                    id="database-url"
                    value={envVars.DATABASE_URL}
                    onChange={(e) =>
                      setEnvVars({ ...envVars, DATABASE_URL: e.target.value })
                    }
                    placeholder="postgresql://..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    updateStepStatus('env', 'completed')
                    setCurrentStep(1)
                    updateStepStatus('database', 'in-progress')
                  }}
                >
                  Next: Test Database
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="database" className="space-y-4">
              <Alert>
                <AlertDescription>
                  Click the button below to test your database connection
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-center py-8">
                <Button
                  size="lg"
                  onClick={async () => {
                    const success = await testDatabaseConnection()
                    if (success) {
                      setTimeout(() => {
                        setCurrentStep(2)
                        updateStepStatus('email', 'in-progress')
                      }, 1000)
                    }
                  }}
                >
                  Test Database Connection
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <Alert>
                <AlertDescription>
                  Configure your email provider (optional but recommended)
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email-from">From Email</Label>
                  <Input
                    id="email-from"
                    type="email"
                    value={envVars.EMAIL_FROM}
                    onChange={(e) =>
                      setEnvVars({ ...envVars, EMAIL_FROM: e.target.value })
                    }
                    placeholder="noreply@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="resend-key">Resend API Key</Label>
                  <Input
                    id="resend-key"
                    value={envVars.RESEND_API_KEY}
                    onChange={(e) =>
                      setEnvVars({ ...envVars, RESEND_API_KEY: e.target.value })
                    }
                    placeholder="re_..."
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    updateStepStatus('email', 'completed')
                    setCurrentStep(3)
                    updateStepStatus('features', 'in-progress')
                  }}
                >
                  Skip Email Setup
                </Button>
                <Button
                  onClick={async () => {
                    await testEmailConfiguration()
                    setTimeout(() => {
                      setCurrentStep(3)
                      updateStepStatus('features', 'in-progress')
                    }, 1000)
                  }}
                >
                  Test & Continue
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Alert>
                <AlertDescription>
                  Choose which features you'd like to enable
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Payments</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable Stripe payments and subscriptions
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={features.payments}
                    onChange={(e) =>
                      setFeatures({ ...features, payments: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable Vercel Analytics and monitoring
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={features.analytics}
                    onChange={(e) =>
                      setFeatures({ ...features, analytics: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Chat</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable real-time chat features
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={features.chat}
                    onChange={(e) =>
                      setFeatures({ ...features, chat: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  size="lg"
                  onClick={() => {
                    updateStepStatus('features', 'completed')
                    completeSetup()
                  }}
                >
                  Complete Setup
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}