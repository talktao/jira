import { useMemo, useState } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject, subset } from "utils"

/**
 * 返回页面url中，指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
	const [stateKeys] = useState(keys)
	const [searchParams] = useSearchParams()
	const setSearchParams = useSetUrlSearchParam()
	return [
		useMemo(
			() =>
				subset(Object.fromEntries(searchParams), stateKeys) as {
					[key in K]:string
				},
			[searchParams, stateKeys]
		),
		(params: Partial<{ [key in K]: unknown }>) => {
			return setSearchParams(params)
		}
	] as const 
}

export const useSetUrlSearchParam = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	return (params:{[key in string]: unknown}) => {
		const o = cleanObject({
			...Object.fromEntries(searchParams), // Object.fromEntries读取现在url传入的参数把它变成一个普通的对象，再用新传入的参数覆盖掉
			...params
		}) as URLSearchParamsInit 
		return setSearchParams(o)
	}
}