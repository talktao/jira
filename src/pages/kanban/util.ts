import { useMemo } from "react"
import { useLocation } from "react-router"
import { useProject } from "utils/project"
import { useUrlQueryParam } from "utils/url"

// 获取url里面的project/${id} 中的id
export const useProjectIdInUrl = () => {
	const { pathname } = useLocation()
	const id = pathname.match(/projects\/(\d+)/)?.[1]
	return Number(id)
}

// 根据url的id获取项目详情
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

// 根据url的id获取看板详情
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbansQueryKey = () => ['kanbans', useKanbanSearchParams()]

// 根据url的id获取任务组详情
export const useTaskSearchParams = () => {
	const [param, setParam] = useUrlQueryParam([
		'name',
		'typeId',
		'processorId',
		'tagId'
	])
	const projectId = useProjectIdInUrl()
	return useMemo(() => ({
		projectId,
		typeId: Number(param.typeId) || undefined,
		processorId: Number(param.processorId) || undefined,
		tagId: Number(param.tagId) || undefined,
		name: param.name
	}), [projectId, param])
}

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]