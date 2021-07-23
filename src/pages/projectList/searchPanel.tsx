/** @jsx jsx */  
import React from "react"
import {jsx} from '@emotion/react' // emotion行内样式
import { Form, Input } from "antd"
import { Project } from "types/Project";
import { UserSelect } from "components/user-select";
import { User } from "../../types/User";

interface SearchPanelProps {
	users: User[],
	param: Partial<Pick<Project, 'name'|'personId'>>,
	setParam: (param: SearchPanelProps['param']) => void
}

/* search表单组件 */
export const SearchPanel = ({ param, users, setParam }: SearchPanelProps) => {
	return (
		<Form css={{marginBottom: '2rem'}} layout={"inline"}>
			<Form.Item>
				<Input placeholder={'项目名'} type="text" value={param.name} onChange={(e) => setParam({
					...param,
					name: e.target.value
				})} />
			</Form.Item>
			<Form.Item>
				<UserSelect
					defaultOptionName={'负责人'}
					value={param.personId}
					onChange={value => setParam({
					...param,
					personId: value
					})} />
			</Form.Item>
		</Form>
	)
}