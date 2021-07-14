import React, { useState } from "react"
import { ProjectListPage } from "pages/projectList"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { ButtonNoPadding, Row } from "components/lib"
import { ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectPage } from "pages/project"
import { resetRoute } from "utils"
import { ProjectModal } from "pages/projectList/projectModal"
import { ProjectPopover } from "components/project-popover"


/** 
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 要考虑，是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般固定），然后再把元素往里填充
 * 从内容出发：用flex
 * 从布局出发：用grid
 * 
 */

 // prop drilling ,变量提升，一层一层往下钻

export const AuthenticatedApp = () => {
	const [projectModalOpen, setProjectModalOpen] = useState(false)

	return (
		<Container>
			<PageHeader setProjectModalOpen={setProjectModalOpen} />
			<Main>
				<Router>
					<Routes>
						<Route path={'/projects'} element={<ProjectListPage setProjectModalOpen={setProjectModalOpen} />} />
						<Route path={'/projects/:projectId/*'} element={<ProjectPage />} />
						<Navigate to={'/projects'}></Navigate>
					</Routes>
				</Router>
			</Main>
			<ProjectModal projectModalOpen={projectModalOpen} onClose={()=>setProjectModalOpen(false)}/>
		</Container>
	)
}

const PageHeader = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
	return (
		<Header between={true}>
			<HeaderLeft gap={true}>
				<ButtonNoPadding type={'link'} onClick={resetRoute}>
					<SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
				</ButtonNoPadding>
				<ProjectPopover setProjectModalOpen={props.setProjectModalOpen}/>
				<span>用户</span>
			</HeaderLeft>
			<HeaderRight>
				<User/>
			</HeaderRight>
		</Header>
	)
}

const User = () => {
	const { logout, user } = useAuth()
	return (
		<Dropdown overlay={
			<Menu>
				<Menu.Item key={'logout'}>
					<Button type="link" onClick={logout}>登出</Button>
				</Menu.Item>
			</Menu>
		}>
			{/* 防止页面重新刷新 */}
			<Button type="link" onClick={e => e.preventDefault()}>
				Hi，{user?.name}
			</Button>
		</Dropdown>
	)
}

// tempoal dead zone(暂时性死区)
const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr 6rem;
	height: 100vh;
`
const Header = styled(Row)`
	padding: 3.2rem;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	z-index: 1
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``
