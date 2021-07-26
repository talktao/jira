import React from 'react'
import { Button, Input } from 'antd'
import { Row } from 'components/lib'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import { useSetUrlSearchParam } from 'utils/url'
import { useTaskSearchParams } from './util'

export const SearchPannel = () => {
	const searchParams = useTaskSearchParams()
	const setSearchParams = useSetUrlSearchParam()
	// 重置按钮
	const reset = () => {
		setSearchParams({
			typeId: undefined,
			processorId: undefined,
			tagId:  undefined,
			name: undefined
		})
	}

	return (
		<Row marginBottom={4} gap={true}>
			{/* 姓名搜索 */}
			<Input style={{ width: '20rem' }} placeholder={'任务名'} value={searchParams.name} onChange={(e) => setSearchParams({ name: e.target.value })} />
			{/* 经办人搜索 */}
			<UserSelect defaultOptionName={'经办人'} value={searchParams.processorId} onChange={(value) => setSearchParams({ processorId: value })} />
			{/* 类型搜索 */}
			<TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId} onChange={(value) => setSearchParams({ typeId: value })} />
			<Button onClick={reset}>清除筛选器</Button>
		</Row>
	)
}