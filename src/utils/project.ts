import { Project } from "pages/projectList/list"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useHttp } from "./http"

export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()

	return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
}

// 编辑
export const useEditProject = () => {
	// const { run, ...asyncResult } = useAsync()
	const client = useHttp()
	const queryClient = useQueryClient()
	return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
		method: 'PATCH',
		data: params
	}), {
		onSuccess: ()=>queryClient.invalidateQueries('projects')  // 成功请求后对缓存进行刷新
	})
}

// 添加
export const useAddProject = () => {
	// const { run, ...asyncResult } = useAsync()
	const client = useHttp()
	const queryClient = useQueryClient()
	return useMutation((params: Partial<Project>) => client(`projects`, {
		method: 'POST',
		data: params
	}), {
		onSuccess: ()=>queryClient.invalidateQueries('projects')
	})
}

// 获取项目详情，通过id
export const useProject = (id: number) => {
	const client = useHttp()
	return useQuery<Project> (
		['project', { id }], // query KEY
		() => client(`projects/${id}`),
		{
			enabled: !!id  // 只有当id有值时才会触发获取详情的操作
		}
	)
}