import { useState } from 'react'

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
	const run = (promise: Promise<D>) => {
		// 如果传入的不是一个promise则会打断一切进程
		if (!promise || !promise.then) {
			throw new Error('请传入 Promise 类型数据')
		}
		// 如果传入的是一个正常的promise，则先将state下的stat状态设置为loading
		setState({ ...state, stat: 'loading' })
		// 数据成功返回调用 setData 将传入的数据保存起来
		return promise.then(data => {
			setData(data)
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
		...state
	}
}