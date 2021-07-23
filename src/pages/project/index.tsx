import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'
import { BoardPage } from 'pages/boardPage'
import { EpicPage } from 'pages/EpicPage'


export const ProjectPage = () => {
	return (
		<div>
			<h1>ProjectPage</h1>
			<Link to={'board'}>看板</Link>
			<Link to={'epic'}>任务组</Link>
			<Routes>
				{/* projects/:projectId/board */}
				<Route path={'/board'} element={<BoardPage />} />
				{/* projects/:projectId/board */}
				<Route path={'/epic'} element={<EpicPage />} />
				<Navigate to={window.location.pathname + '/board'} replace={true}/>
			</Routes>
		</div>
	)
}