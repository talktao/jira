/* 项目列表主页面 */
import React from 'react'
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from '../../utils'
// import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
// import { useUrlQueryParam } from 'utils/url'
import { useProjectSearchParams } from './util'
import { Row } from 'components/lib'

export const ProjectListPage = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {

	// 设置浏览器顶部标签页的title
	useDocumentTitle('项目列表', false)

	// 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象绝不可以放到依赖里

	const [param, setParam] = useProjectSearchParams()
	// useProjects自定义hook，将自定义的useHttp，useAsync以及react useEffect组合起来
	// 获取project工程列表，以及异步状态的loading
	const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 200))
	// 获取负责人信息
	const { data: users } = useUsers()

	return (
		<Container>
			<Row between={true}>
				<h1>项目列表</h1>
				<Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
			</Row>
			
			<SearchPanel users={users || []} param={param} setParam={setParam} />
				{error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
			<List setProjectModalOpen={props.setProjectModalOpen} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []} />
		</Container>
	)
}

ProjectListPage.whyDidYouRender = true

const Container = styled.div`
	padding: 3.2rem
`
