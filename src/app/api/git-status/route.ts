import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  try {
    // Get current branch
    const { stdout: branch } = await execAsync('git rev-parse --abbrev-ref HEAD')
    
    // Get current commit
    const { stdout: commit } = await execAsync('git rev-parse HEAD')
    
    // Get remote URL
    const { stdout: remote } = await execAsync('git config --get remote.origin.url')
    
    // Fetch latest from remote (without merging)
    await execAsync('git fetch')
    
    // Get commits behind/ahead
    const { stdout: behindAhead } = await execAsync(
      `git rev-list --left-right --count HEAD...origin/${branch.trim()}`
    )
    const [ahead, behind] = behindAhead.trim().split('\t').map(Number)
    
    // Get number of modified files
    const { stdout: modified } = await execAsync('git status --porcelain')
    const modifiedCount = modified.split('\n').filter(line => line.trim()).length
    
    // Get last fetch time
    const { stdout: fetchHead } = await execAsync('stat -c %Y .git/FETCH_HEAD 2>/dev/null || stat -f %m .git/FETCH_HEAD 2>/dev/null || echo 0')
    const lastFetchTimestamp = parseInt(fetchHead.trim()) * 1000
    const lastFetch = lastFetchTimestamp 
      ? new Date(lastFetchTimestamp).toLocaleTimeString() 
      : 'Never'

    return NextResponse.json({
      branch: branch.trim(),
      commit: commit.trim(),
      behind,
      ahead,
      modified: modifiedCount,
      lastFetch,
      remote: remote.trim(),
    })
  } catch (error) {
    console.error('Git status error:', error)
    return NextResponse.json(
      { error: 'Failed to get git status' },
      { status: 500 }
    )
  }
}