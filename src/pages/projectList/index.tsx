/* 项目列表主页面 */
import React, {useState} from 'react'
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from '../../utils'
// import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'

export const ProjectListPage = () => {
	// 负责人的参数
	const [param, setParam] = useState({
		name: '', // 姓名
		personId: '' // id
	})
	const debounceParam = useDebounce(param, 200)

	// useProjects自定义hook，将自定义的useHttp，useAsync以及react useEffect组合起来
	// 获取project工程列表，以及异步状态的loading
	const { isLoading, error, data: list } = useProjects(debounceParam)
	// 获取负责人信息
	const { data: users } = useUsers()
	// 设置浏览器顶部标签页的title
	useDocumentTitle('项目列表', false)

	return (
		<Container>
			<h1>项目列表</h1>
			<SearchPanel users={users || []} param={param} setParam={setParam} />
				{error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
			<List loading={isLoading} users={users || []} dataSource={list || []} />
		</Container>
	)
}

const Container = styled.div`
	padding: 3.2rem
`
