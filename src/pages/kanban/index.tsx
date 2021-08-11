// 看板页面
import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { CreateKanban } from 'pages/kanban/create-kanban'
import { KanbanColumn } from 'pages/kanban/kanban-column'
import { SearchPannel } from 'pages/kanban/search-panel'
import { useKanbanSearchParams, useProjectInUrl, useTaskSearchParams } from './util'

export const KanbanPage = () => {
	useDocumentTitle('看板列表')

	const {data: currentProject } = useProjectInUrl()
	const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
	const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams())
	const isLoading = taskIsLoading || kanbanIsLoading
	return (
		<ScreenContainer>	
			<h1>{currentProject?.name}看板</h1>
			<SearchPannel />
			{isLoading ? <Spin size={'large'}/> : <ColumnsContainer>
				{
					kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id} />)
				}
				<CreateKanban/>
			</ColumnsContainer>}
		
		</ScreenContainer>
	)
}


export const ColumnsContainer = styled.div`
	display: flex;
	overflow-x: scroll;
	flex: 1;
`