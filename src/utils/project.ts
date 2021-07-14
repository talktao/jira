import { Project } from "pages/projectList/list"
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"
import { useAsync } from "./use-async"

export const useProjects = (param?: Partial<Project>) => {
	const client = useHttp()
	const { run, ...result } = useAsync<Project[]>()
	
	const fetchProjects = () => client('projects', { data: cleanObject(param || {}) })

	// 当param改变时获取列表
	useEffect(() => {
		run(fetchProjects(), {
			retry: fetchProjects
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param])
	return result
}

// 编辑
export const useEditProject = () => {
	const { run, ...asyncResult } = useAsync()
	const client = useHttp()
	const mutate = (params: Partial<Project>) => {
		return run(client(`projects/${params.id}`, {
			data: params,
			method: 'PATCH'
		}))
	}
	return {
		mutate,
		...asyncResult
	}
}

// 添加
export const useAddProject = () => {
	const { run, ...asyncResult } = useAsync()
	const client = useHttp()
	const mutate = (params: Partial<Project>) => {
		return run(client(`projects/${params.id}`, {
			data: params,
			method: 'POST'
		}))
	}
	return {
		mutate,
		...asyncResult
	}
}