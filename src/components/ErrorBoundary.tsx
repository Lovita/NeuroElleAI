import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  error: Error | null
}

/**
 * Top-level safety net. Without this, any uncaught render error produces a
 * silent blank page with nothing but a console stack trace — which is very
 * hard for a non-developer to diagnose. This shows a visible, human-readable
 * message instead.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('[Neuro Elle AI] Uncaught render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ maxWidth: 640, margin: '4rem auto', padding: '0 1.5rem', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F4C5C' }}>
            Something went wrong loading this page.
          </h1>
          <p style={{ marginTop: '0.75rem', color: '#253238' }}>
            Open the browser console for the full error. A common cause is a missing or
            misconfigured <code>.env</code> file — see <code>.env.example</code>.
          </p>
          <pre
            style={{
              marginTop: '1rem',
              padding: '1rem',
              background: '#FAF7F2',
              borderRadius: 8,
              fontSize: '0.8rem',
              overflowX: 'auto',
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
