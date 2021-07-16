import React from "react";

const ErrorComponent = () => {
    return <h1>Something went wrong</h1>;
  };

class ErrorBoundary extends React.Component {
    state = {
      hasError: false,
      error: { message: '', stack: '' },
      info: { componentStack: '' }
    };
  
    static getDerivedStateFromError = (error: any) => {
      return { hasError: true };
    };
  
    componentDidCatch = (error: any, info: any) => {
      this.setState({ error, info });
    };
  
    render() {
      const { hasError } = this.state;
      const { children } = this.props;
  
      return hasError ? <ErrorComponent/> : children;
    }
  }

  export default ErrorBoundary