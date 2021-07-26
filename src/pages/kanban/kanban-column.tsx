import React from 'react'
import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useTaskTypes } from 'utils/task-type'
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from '@emotion/styled'
import { Card } from 'antd'

const TaskTypeIcon = ({ id }: { id: number }) => {
	const { data: taskTypes } = useTaskTypes()
	const name = taskTypes?.find(taskType => taskType.id === id)?.name
	if (!name) {
		return null
	}
	return <img src={name === 'task' ? taskIcon : bugIcon} alt='' />
}

export const KanbanColumn = ({ Kanban }: { Kanban: Kanban }) => {
	const { data: allTasks } = useTasks()
	const tasks = allTasks?.filter(task => task.kanbanId === Kanban.id)
	
	return (
		<Container>
			<TasksContainer>
				<h3>{Kanban.name}</h3>
				{
					tasks?.map(task => (
						<Card style={{ marginBottom: '0.5rem' }} key={task.id}>
							<div>
								{task.name}
							</div>
							<TaskTypeIcon id={task.typeId}/>
						</Card>
					))
				}
			</TasksContainer>
		</Container>
	)
}

const Container = styled.div`
	min-width: 27rem;
	border-radius: 6px;
	background-color: rgb(244, 245, 247);
	display: flex;
	flex-direction: column;
	padding: 0.7rem 0.7rem 1rem;
	margin-right: 1.5rem
`

const TasksContainer = styled.div`
	overflow: scroll;
	flex: 1;

	::-webkit-scrollbar{
		display: none;
	}
`