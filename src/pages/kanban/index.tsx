// 看板页面
import styled from '@emotion/styled'
import { ScreenContainer } from 'components/lib'
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPannel } from './searchPannel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanbanPage = () => {
	useDocumentTitle('看板列表')

	const {data: currentProject } = useProjectInUrl()
	const { data: kanbans } = useKanbans(useKanbanSearchParams())
	
	return (
		<ScreenContainer>	
			<h1>{currentProject?.name}看板</h1>
			<SearchPannel/>
			<ColumnsContainer>
			{
				kanbans?.map(Kanban => <KanbanColumn Kanban={Kanban} key={Kanban.id} />)
			}
			</ColumnsContainer>
		</ScreenContainer>
	)
}


const ColumnsContainer = styled.div`
	display: flex;
	flex: 1;
`