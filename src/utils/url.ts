import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

/**
 * 返回页面url中，指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
	const [searchParams, setSearchParam] = useSearchParams()
	return [
		useMemo(
			() => keys.reduce((prev, key) => {
				return { ...prev, [key]: searchParams.get(key) || '' }
			}, {} as { [key in K]: string }),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[searchParams] // keys只能是状态值，如果是数组或是其他将会导致无限循环
		),
		(params: Partial<{ [key in K]: unknown }>) => {
			// iterator
			// Object.fromEntries读取现在url传入的参数把它变成一个普通的对象，再用新传入的参数覆盖掉
			const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
			return setSearchParam(o)
		},
		setSearchParam
	] as const
}