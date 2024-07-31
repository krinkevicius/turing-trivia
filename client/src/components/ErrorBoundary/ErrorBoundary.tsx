import Fallback from '@/components/ErrorBoundary/Fallback'
import { ERROR_MAP } from '@/consts'
import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: '',
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (!ERROR_MAP[error.message]) {
      // rkq: change
      console.error('Report to Sentry', error, errorInfo)
    }
  }

  public render() {
    if (this.state.hasError) {
      return <Fallback message={this.state.message} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
