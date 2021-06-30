import React from "react"
import { ProjectListPage } from "pages/projectList"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Row } from "components/lib"

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

export const AuthenticatedApp = () => {
	const { logout } = useAuth()
	return (
		<Container>
			<Header between={true}>
				<HeaderLeft gap={true}>
					<h3>Logo</h3>
					<h3>项目</h3>
					<h3>用户</h3>
				</HeaderLeft>
				<HeaderRight>
					<button onClick={logout}>登出</button>
				</HeaderRight>
			</Header>
			<Main>
				<ProjectListPage />
			</Main>
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 6rem 1fr 6rem;
	height: 100vh;
`
const Header = styled(Row)``

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``
