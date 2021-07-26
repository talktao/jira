import { useLocation } from "react-router"
import { useProject } from "utils/project"

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
export const useTaskSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]