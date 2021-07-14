import { useState } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
	error: Error | null, // 异常状态
	data: D | null, // 数据
	stat: 'idle' | 'loading' | 'error' | 'success' // 未发生 | 正在发生 | 发生完出现错误 | 成功
}

// 定义的默认初始状态
const defaultInitialState: State<null> = {
	stat: 'idle',
	data: null,
	error: null
}

//定义是否抛出异常的状态
const defaultConfig = {
	throwOnError: false // 不抛出
}

// inittialState 为用户传入的状态，优先级较默认的高
export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
	const config = {...defaultConfig, initialConfig}
	const [state, setState] = useState<State<D>>({
		...defaultInitialState,
		...initialState
	})

	const mountedRef = useMountedRef()
	// useState直接传入的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
	// https://codesandBox.io/s/blissful-water-230u4?file=/src/App.js
	const [retry, setRetry] = useState(() => () => { })


	// 调用data的函数，请求成功时才会调用
	const setData = (data:D) => setState({
		data,
		stat: 'success',
		error: null
	})

	const setError = (error: Error) => setState({
		error,
		stat: 'error',
		data: null
	})

	// run 用来触发异步请求
	const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
		// 如果传入的不是一个promise则会打断一切进程
		if (!promise || !promise.then) {
			throw new Error('请传入 Promise 类型数据')
		}

		setRetry(() => () => {
			if (runConfig?.retry) {
				run(runConfig?.retry(), runConfig)
			}

		})
		
		// 如果传入的是一个正常的promise，则先将state下的stat状态设置为loading
		setState({ ...state, stat: 'loading' })
		// 数据成功返回调用 setData 将传入的数据保存起来
		return promise.then(data => {
			if (mountedRef.current) {
				setData(data)
			}
			return data
		}).catch(error => {
			// catch会消化异常，如果不主动输出，外面是接收不到异常的
			setError(error)
			if (config.throwOnError) return Promise.reject(error)
			return error
		})
	}

	return {
		isIdle: state.stat === 'idle',
		isLoading: state.stat === 'loading',
		isError: state.stat === 'error',
		isSuccess: state.stat === 'success',
		run,
		setData,
		setError,
		// retry 被调用时重新跑一边run，让state刷新一边
		retry,
		...state
	}
}