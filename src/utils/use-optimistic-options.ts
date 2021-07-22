import { QueryKey, useQueryClient } from "react-query";

/* 乐观更新 */
export const useConfig = (
	queryKey: QueryKey,
	callback: (target: any, old?: any[]) => any[]
) => {
	const queryClient = useQueryClient()
	return {
		onSuccess: ()=>queryClient.invalidateQueries(queryKey), // 成功请求后对缓存进行刷新
		async onMutate(target: any) {
			const previousItems = queryClient.getQueryData(queryKey)  // 获取当前queryKey的data
			queryClient.setQueryData(queryKey, (old?: any[]) => {
				return callback(target, old)
			})
			return {previousItems}
		},
		onError(error: any, newItem: any, context: any) {
			queryClient.setQueriesData(queryKey, (context as { previousItems: any[] }).previousItems)
		}
	}
}

export const useDeleteConfig = (queryKey: QueryKey)=>useConfig(queryKey, (target, old)=>old?.filter(item=>item.id !== target.id) || []) 
export const useEditConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old?.map(item => item.id === target.id ? {...item, ...target} : item) || [])
export const useAddConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old) => old ? [...old, target] : [])