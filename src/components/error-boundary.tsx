import React from 'react'

type FallbackRenfer = (props: { error: Error | null }) => React.ReactElement
// https://github.com/byaughn/react-error-boundary
// {children:ReactNode, fallbackRender: FallbackRenfer}中的children可以用React API, React.PropsWithChildren代替
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRenfer }>, { error: Error | null }> {
	state = { error: null }
	
	// 当子组件异常，这里会接收到并且调用
	static getDerivedStateFromError(error: Error) {
		return {error}
	}

	render() {
		const { error } = this.state
		const { fallbackRender, children } = this.props
		if (error) {
			return fallbackRender({error})
		}
		return children
	}
}