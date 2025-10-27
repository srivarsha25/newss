export default function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Loading articles...</p>
      </div>
    </div>
  )
}
