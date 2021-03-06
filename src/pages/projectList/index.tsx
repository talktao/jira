/* 项目列表主页面 */
import React from 'react'
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from 'utils'
// import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectModal, useProjectSearchParams } from './util'
import { ButtonNoPadding, ErrorBox, Row } from 'components/lib'

export const ProjectListPage = () => {

	// 设置浏览器顶部标签页的title
	useDocumentTitle('项目列表', false)

	const { open } = useProjectModal()

	// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象绝不可以放到依赖里

	const [param, setParam] = useProjectSearchParams()
	// useProjects自定义hook，将自定义的useHttp，useAsync以及react useEffect组合起来
	// 获取project工程列表，以及异步状态的loading
	const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
	// 获取负责人信息
	const { data: users } = useUsers()

	return (
		<Container>
			<Row between={true}>
				<h1>项目列表</h1>
				<ButtonNoPadding onClick={open} type={'link'}>创建项目</ButtonNoPadding>
			</Row>
			
			<SearchPanel users={users || []} param={param} setParam={setParam} />
			<ErrorBox error={error} />
			<List loading={isLoading} users={users || []} dataSource={list || []} />
		</Container>
	)
}

ProjectListPage.whyDidYouRender = false

const Container = styled.div`
	width: 100%;
	padding: 3.2rem
`
