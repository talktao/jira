import { Project } from "pages/projectList/list"
import { QueryKey, useMutation, useQuery } from "react-query"
import { useHttp } from "./http"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-options"

export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()

	return useQuery<Project[]>(['projects', param], () => client('projects', {data: param}))
}

// 编辑
export const useEditProject = (queryKey: QueryKey) => {
	const client = useHttp()
	return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
		method: 'PATCH',
		data: params
	}),
		useEditConfig(queryKey)
	)
}

// 添加
export const useAddProject = (queryKey: QueryKey) => {
	const client = useHttp()
	return useMutation((params: Partial<Project>) => client(`projects`, {
		method: 'POST',
		data: params
	}),
		useAddConfig(queryKey)
	)
}

// 删除
export const useDeleteProject = (queryKey: QueryKey) => {
	const client = useHttp()
	
	return useMutation(({id}:{id: number}) => client(`projects/${id}`, {
		method: 'Delete',
	}),
		useDeleteConfig(queryKey)
	)
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