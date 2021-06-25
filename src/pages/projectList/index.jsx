/* 项目列表主页面 */
import React, {useState, useEffect} from 'react'
import { SearchPanel } from './searchPanel'
import { List } from './list'
import { cleanObject, useDebounce, useMount } from '../../utils'
import * as qs from 'qs'

// 获取接口
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListPage = () => {
	// 负责人的参数
	const [param, setParam] = useState({
		name: '', // 姓名
		personId: '' // id
	})
	const debounceParam = useDebounce(param, 2000)
	// 定义负责人列表
	const [users, setUsers] = useState([])
	
	const [list, setList] = useState([])

	// 当param改变时获取列表
	useEffect(() => {
		fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async res => {
			if (res.ok) {
				// 当请求成功时，将数据保存下来
				setList(await res.json())
			}
		})
	}, [debounceParam])

	useMount(() => {
		fetch(`${apiUrl}/users`).then(async res => {
			if (res.ok) {
				// 当请求成功时，将数据保存下来
				setUsers(await res.json())
			}
		})
	})

	return (
		<div>
			<SearchPanel users={users} param={param} setParam={setParam} />
			<List users={users} list={list} />
		</div>
	)
}
