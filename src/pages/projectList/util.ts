import { useMemo } from "react"
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
	const [{projectCreate}, setProjectCreate] = useUrlQueryParam([
		'projectCreate'
	])
	const open = ()=>setProjectCreate({projectCreate: true})
	const close = () => setProjectCreate({ projectCreate: undefined })

	return {
		projectModalOpen: projectCreate === 'true',
		open,
		close
	}
}