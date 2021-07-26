/* 看板获取数据的组件 */
import { useQuery } from "react-query"
import { useHttp } from "./http"
import { Kanban } from "types/kanban"

export const useKanbans = (param?: Partial<Kanban>) => {
	const client = useHttp()

	return useQuery<Kanban[]>(['Kanbans', param], () => client('Kanbans', {data: param}))
}