export interface Task {
	id: number
	name: string
	// 经办人
	processorId: number
	projectId: number
	// 任务组
	epicId: number  // 任务组Id
	kanbanId: number // 看板Id
	// bug or task
	typeId: number
	note: string
}