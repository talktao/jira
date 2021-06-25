import { useEffect, useState } from 'react'
// 排除value为0的情况
export const isFalsy = (value) => value === 0 ? false : !value

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
	if (!object) {
    return {};
  }
	const result = { ...object }
	Object.keys(result).forEach(key => {
		//将对象key所对应的值赋值给value
		const value = result[key]
		// 0
		if (isFalsy(value)) {
			delete result[key]
		}
	})
	return result
}

// 页面挂载时只执行一次的hook
export const useMount = (callback) => {
	useEffect(() => {
		callback()
	}, [])
}

// 延时执行函数
export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		// 每次在value变化以后，设置一个定时器
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		// 每次再上一个useEffect处理完之后再运行
		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}