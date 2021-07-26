/* 任务组获取数据的组件 */
import { useQuery } from "react-query"
import { TaskType } from "types/taskType"
import { useHttp } from "./http"

export const useTaskTypes = () => {
	const client = useHttp()

	return useQuery<TaskType[]>(['taskTypes'], () => client('taskTypes'))
}