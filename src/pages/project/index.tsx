import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate, useLocation } from 'react-router'
import { KanbanPage } from 'pages/kanban'
import { TaskPage } from 'pages/taskPage'
import styled from '@emotion/styled'
import { Menu } from 'antd'

const useRouteType = () => {
	const units = useLocation().pathname.split('/')
	return units[units.length - 1]
}


export const ProjectPage = () => {
	const routeType = useRouteType()
	return (
		<Container>
			<Aside>
				<Menu mode={"inline"} selectedKeys={[routeType]}>
					<Menu.Item key={'kanban'}>
						<Link to={'kanban'}>看板</Link>
					</Menu.Item>
					<Menu.Item key={'epic'} >
						<Link to={'epic'}>任务组</Link>
					</Menu.Item>
				</Menu>
			</Aside>
			<Main>
				<Routes>
					{/* projects/:projectId/board */}t
					<Route path={'/kanban'} element={<KanbanPage />} />
					{/* projects/:projectId/board */}
					<Route path={'/epic'} element={<TaskPage />} />
					<Navigate to={window.location.pathname + '/board'} replace={true}/>
				</Routes>
			</Main>
		</Container>
	)
}
const Container = styled.div`
	display: grid;
	grid-template-columns: 16rem 1fr;
`

const Aside = styled.div`
background-color: rgb(244, 245, 247);
display: flex;
`

const Main = styled.div`
	display: flex;
	box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1)
`