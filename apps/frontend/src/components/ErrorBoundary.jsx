import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('🛑 ErrorBoundary caught:', error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.error) {
      // render fallback UI
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.toString()}
            <br />
            {this.state.info?.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
