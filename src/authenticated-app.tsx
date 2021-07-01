import React from "react"
import { ProjectListPage } from "pages/projectList"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Row } from "components/lib"
import { ReactComponent as SoftwareLogo} from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from "antd"

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
	const { logout, user } = useAuth()
	return (
		<Container>
			<Header between={true}>
				<HeaderLeft gap={true}>
					<SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
					<h3>项目</h3>
					<h3>用户</h3>
				</HeaderLeft>
				<HeaderRight>
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
const Header = styled(Row)`
	padding: 3.2rem;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	z-index: 1
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main``
