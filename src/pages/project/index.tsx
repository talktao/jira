import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'
import { KanbanPage } from 'pages/kanban'
import { TaskPage } from 'pages/taskPage'


export const ProjectPage = () => {
	return (
		<div>
			<h1>ProjectPage</h1>
			<Link to={'kanban'}>看板</Link>
			<Link to={'epic'}>任务组</Link>
			<Routes>
				{/* projects/:projectId/board */}t
				<Route path={'/kanban'} element={<KanbanPage />} />
				{/* projects/:projectId/board */}
				<Route path={'/epic'} element={<TaskPage />} />
				<Navigate to={window.location.pathname + '/board'} replace={true}/>
			</Routes>
		</div>
	)
}