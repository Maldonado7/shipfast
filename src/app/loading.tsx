export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}