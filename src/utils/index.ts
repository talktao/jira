import { useEffect, useState } from 'react'
// 排除value为0的情况
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// let a: object
// a = { name: 'jack' }
// a = () => { }
// a = new RegExp('')

// let b: { [key: string]: unknown }
// b = { name: 'jack' }
// b = () => { }

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key: string]: unknown}) => {
	if (!object) {
    return {};
  }
	const result = { ...object }
	Object.keys(result).forEach(key => {
		//将对象key所对应的值赋值给value
		const value = result[key]
		// 0
		if (isVoid(value)) {
			delete result[key]
		}
	})
	return result
}

// 页面挂载时只执行一次的hook
export const useMount = (callback: () => void) => {
	useEffect(() => {
		callback()
		// TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}

// 延时执行函数  后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		// 每次在value变化以后，设置一个定时器
		const timeout = setTimeout(() => setDebouncedValue(value), delay)
		// 每次再上一个useEffect处理完之后再运行
		return () => clearTimeout(timeout)
	}, [value, delay])

	return debouncedValue
}

// 数组的增删清空
export const useArray = <T>(initialArray: T[]) => {
	const [value, setValue] = useState(initialArray)
	return {
		value,
		setValue,
		add: (item: T) => setValue([...value, item]),
		clear: () => setValue([]),
		removeIndex: (index: number) => {
			const copy = [...value]
			copy.splice(index, 1)
			setValue(copy)
		}
	}
}

// 自定义项目浏览器顶部标签页的title
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
	const oldTitle = document.title
	useEffect(() => {
		document.title = title
	}, [title])
	
	useEffect(() => {
		return () => {
			if (!keepOnUnmount) {
				document.title = oldTitle
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
}