/* 看板获取数据的组件 */
import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { Kanban } from "types/kanban"
import { useAddConfig } from "./use-optimistic-options"

export const useKanbans = (param?: Partial<Kanban>) => {
	const client = useHttp()

	return useQuery<Kanban[]>(['Kanbans', param], () => client('Kanbans', { data: param }))

}

	// 添加看板
	export const useAddKanban = (queryKey: QueryKey) => {
		const client = useHttp()
		return useMutation((params: Partial<Kanban>) => client(`kanbans`, {
			method: 'POST',
			data: params
		}),
			useAddConfig(queryKey)
		)
	}