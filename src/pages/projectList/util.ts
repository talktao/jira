import { useMemo } from "react"
import { useProject } from "utils/project"
import { useUrlQueryParam } from "utils/url"

// 项目列表搜索的参数
export const useProjectSearchParams = () => {
	// 下两行一起协作将name和personId获取出来，而搜索出来的name和personId不一定只在当前projectList文件中使用 
	const [param, setParam] = useUrlQueryParam(['name', 'personId'])
	return [
		useMemo(()=>({ ...param, personId: Number(param.personId) || undefined }), [param]),
		setParam
	] as const
}

export const useProjectModal = () => {
	// projectCreate 判断现在是不是创建 
	const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
		'projectCreate'
	])

	// editingProjectId 判断现在是不是在编辑
	const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
		'editingProjectId'
	])
	const {data: editingProject, isLoading } = useProject(Number(editingProjectId))

	const open = () => setProjectCreate({ projectCreate: true })
	const close = () => {
		setProjectCreate({ projectCreate: undefined })
		setEditingProjectId({editingProjectId: undefined})
	}
	const startEdit = (id: number) => setEditingProjectId({editingProjectId:id}) //开始编辑

	return {
		projectModalOpen: projectCreate === 'true' || !!editingProjectId,
		open,
		close,
		startEdit,
		editingProject,
		isLoading
	}
}